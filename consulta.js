
export default async function handler(req, res) {
  const { marca, modelo, fallo } = req.body;

  const prompt = `Soy un mecánico experto. Analiza el siguiente caso de motocicleta:
Marca: ${marca}
Modelo: ${modelo}
Problema: ${fallo}
Responde con el posible diagnóstico y cómo solucionarlo. Añade también el mantenimiento recomendado para ese modelo.`;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const json = await openaiRes.json();
  const respuesta = json.choices?.[0]?.message?.content || "No se pudo generar una respuesta.";
  res.status(200).json({ resultado: respuesta });
}
