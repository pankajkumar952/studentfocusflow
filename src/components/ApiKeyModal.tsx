import React, { useState } from "react";
import { Key, X, Eye, EyeOff, Check, ExternalLink } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSave: (key: string) => void;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  apiKey,
  onSave,
}: ApiKeyModalProps) {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(keyInput);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/40 backdrop-blur-sm p-4 animate-scale-up">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-purple-100 flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Gemini Settings</h2>
            <p className="text-xs text-gray-500">Configure your Google Generative AI Key</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="api-key-input" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Gemini API Key
            </label>
            <div className="relative rounded-lg shadow-sm">
              <input
                id="api-key-input"
                type={showKey ? "text" : "password"}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-purple-50 p-4 border border-purple-100/50">
            <h3 className="text-xs font-semibold text-purple-900 mb-1">How to get an API Key?</h3>
            <p className="text-xs text-purple-700 leading-relaxed mb-2">
              You can get a free, developer-tier Gemini API key directly from Google AI Studio in less than a minute.
            </p>
            <a
              href="https://aistudio.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors"
            >
              Get a Free API Key
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="text-[11px] text-gray-500 leading-relaxed">
            <span className="font-semibold text-indigo-600">Privacy Guarantee:</span> Your key is stored locally in your browser's private <code className="bg-gray-100 px-1 rounded">localStorage</code> and is only sent directly to Google's API servers. No third-party backend processes or saves it.
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center justify-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-xl text-white shadow-md transition-all duration-200 cursor-pointer ${
                saved
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95"
              }`}
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved
                </>
              ) : (
                "Save Configuration"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
