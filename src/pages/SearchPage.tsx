import React, { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { useDebounce } from "../hooks/useDebounce";
import { saveFavorite, getFavorites } from "../localStorageUtils";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [results, setResults] = useState<{ name: string }[]>([]);
  const [selected, setSelected] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!debouncedQuery) { setResults([]); return; }
    axios.get(`https://api.npms.io/v2/search?q=${debouncedQuery}`)
      .then(res => setResults(res.data.results.map((r: any) => r.package)))
      .catch(() => setResults([]));
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !reason.trim()) return alert("Select a package and enter why");
    if (getFavorites().some(f => f.name === selected)) return alert("Already in favorites");
    saveFavorite({ name: selected, reason });
    navigate("/favorites");
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white p-8 rounded shadow border">
      <form onSubmit={handleSubmit}>
        <label className="block mb-3 font-medium">Search for NPM Packages</label>
        <div className="flex">
          <TextInput
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. angular"
            className="flex-1"
          />
        </div>
        <div className="my-4">
          <div className="text-xs mb-2 text-gray-600">
            Results<br />
            <span className="text-blue-700">
              This list shows all packages which the api gave for the search query, this list should be scrollable.
            </span>
          </div>
          <div className="max-h-24 overflow-y-auto">
            {results.map(pkg => (
              <label key={pkg.name} className="block mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="pkg"
                  value={pkg.name}
                  checked={selected === pkg.name}
                  onChange={() => setSelected(pkg.name)}
                  className="mr-2"
                />
                {pkg.name}
              </label>
            ))}
          </div>
        </div>
        <label className="block mb-1 font-medium">Why is this your fav?</label>
        <TextArea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder=""
        />
        <Button type="submit" className="mt-2 float-right">
          Submit
        </Button>
      </form>
      <p className="mt-8 text-xs text-blue-600">
        On Submit: Validate if user actually selected a package from radio list and also filled 'why'. Also make sure the same package is already not in the list.
      </p>
    </div>
  );
}
