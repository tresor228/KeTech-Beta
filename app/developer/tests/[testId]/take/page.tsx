'use client';

import { useRef, useState } from 'react';
import CodeEditor, { CodeEditorRef } from "@/components/CodeEditor";

// Définir un type pour la sortie structurée
interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  time: string;
  memory: { formatted: string };
  status: { description: string };
}

export default function TakeTestPage({ params }: { params: { testId: string } }) {
  const { testId } = params;
  const editorRef = useRef<CodeEditorRef | null>(null);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const initialCode = `function solve(a, b) {\n  // Votre code ici\n  console.log('Exemple de log:', 2, 3);\n  return a + b;\n}`;

  const handleRunCode = async () => {
    if (!editorRef.current) return;

    const code = editorRef.current.getCode();
    setIsLoading(true);
    setResult(null);
    setFetchError(null);

    try {
      const response = await fetch('/api/code/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: 'javascript' }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setFetchError(data.error || 'Unknown error from API');
      }
    } catch (error) {
      setFetchError("An unexpected network error occurred.");
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Coding Test: {testId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Description du problème</h2>
          <div className="prose dark:prose-invert">
            <p>
              Écrivez une fonction nommée <code>solve</code> qui prend deux nombres et retourne leur somme.
            </p>
            <p>Pour tester, vous pouvez ajouter une ligne <code>throw new Error("Test error");</code> pour voir comment une erreur est gérée.</p>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-2">Votre solution</h2>
          <div className="border rounded-md overflow-hidden flex-grow">
            <CodeEditor initialCode={initialCode} editorRef={editorRef} />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button 
              onClick={handleRunCode}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
              disabled={isLoading}
            >
              {isLoading ? 'Exécution...' : 'Exécuter le code'}
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:bg-green-300">
              Soumettre
            </button>
          </div>
        </div>
      </div>

      {(result || fetchError) && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Sortie</h2>
          <div className="bg-gray-900 rounded-md p-4 font-mono text-sm">
            {fetchError ? (
              <div className="text-red-400">{fetchError}</div>
            ) : result ? (
              <div>
                <div className={`px-2 py-1 inline-block rounded mb-2 text-white ${result.status.description === 'Accepted' ? 'bg-green-600' : 'bg-red-600'}`}>
                  {result.status.description}
                </div>
                <div className="flex gap-4 mb-2 text-gray-400">
                  <span>Temps: {result.time}s</span>
                  <span>Mémoire: {result.memory.formatted}</span>
                </div>
                {result.stdout && (
                  <div>
                    <h3 className="text-gray-300 font-bold">Sortie standard (stdout):</h3>
                    <pre className="text-white whitespace-pre-wrap">{result.stdout}</pre>
                  </div>
                )}
                {result.stderr && (
                  <div className="mt-2">
                    <h3 className="text-red-400 font-bold">Erreur standard (stderr):</h3>
                    <pre className="text-red-400 whitespace-pre-wrap">{result.stderr}</pre>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
