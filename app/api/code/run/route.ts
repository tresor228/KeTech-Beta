
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json();

    console.log("Code reçu pour simulation d'exécution :", { language, code });

    // Si le code contient le mot "error", nous simulons une erreur d'exécution.
    if (code.toLowerCase().includes('error')) {
      return NextResponse.json({
        stdout: null,
        stderr: "ReferenceError: 'error' is not defined\n    at solve (line 3:5)",
        time: "0.008",
        memory: { raw: 8192, formatted: "8 MB" },
        status: { id: 6, description: "Runtime Error" },
      });
    }

    // Sinon, nous simulons une exécution réussie.
    const successfulResponse = {
      stdout: "Exemple de log: 2 3\n",
      stderr: null,
      time: "0.021",
      memory: { raw: 10240, formatted: "10 MB" },
      status: {
        id: 3,
        description: "Accepted",
      },
    };

    return NextResponse.json(successfulResponse);

  } catch (error: any) {
    console.error("Erreur dans l'API /api/code/run :", error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
