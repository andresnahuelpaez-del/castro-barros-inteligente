import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { extractCvText } from "@/lib/cv-extract";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "No se recibio ningun archivo" },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "El archivo es muy grande (maximo 5 MB)" },
      { status: 400 }
    );
  }

  try {
    const buffer = await file.arrayBuffer();
    const text = await extractCvText(buffer, file.name);

    if (text.trim().length < 30) {
      return NextResponse.json(
        {
          error:
            "No pudimos leer texto del archivo. Puede ser un PDF escaneado (imagen). Copia y pega el texto a mano.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ text: text.trim() });
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar el archivo. Proba con otro formato o pega el texto." },
      { status: 500 }
    );
  }
}
