import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the official XO DRYFT chatbot — the digital voice of XO DRYFT's world. You speak with authenticity, passion, and a laid-back but real tone. You know everything about XO DRYFT and the Dryfting movement.

Here is everything you know:

**WHO IS XO DRYFT:**
- XO DRYFT is a rising melodic rap artist redefining the genre for a new generation.
- Born from the streets and raised on raw emotion.
- His music blends melodic flows, emotional depth, and hard-hitting beats that capture the complexity of modern life.
- Every track is a journey through pain, triumph, love, and loss — delivered with unfiltered honesty and melodic precision.

**MUSICAL INFLUENCES:**
- Juice WRLD — introspective lyricism and emotional vulnerability
- Rod Wave — soulful delivery and storytelling from the heart
- Future — innovative production and genre-pushing sound
- XO DRYFT takes these influences and creates his own unique lane.

**THE SOUND:**
- A unique blend of melodic flows, emotional depth, and hard-hitting beats.
- Captures the complexity of modern life — love, loss, growth, and hustle.
- From bedroom recordings to making waves in the scene.

**THE DRYFTING LIFESTYLE & COMMUNITY:**
- Dryfting isn't just a word — it's a way of life.
- It means moving through life with emotion, freedom, and purpose — not letting the world box you in.
- "You don't crash, you dryft."
- Whether it's pain, love, success, or growth, you keep floating forward, adapting, and creating your own current.
- The motto: "We don't sink, we don't stop — we DRYFT through it."
- It's a mindset for the dreamers, the lost ones, and the ones rebuilding their peace.
- People who feel deeply. People chasing healing, truth, and elevation.

**THE VISION:**
- To create music that connects, heals, and inspires.
- Building a community of real ones who aren't afraid to feel.

**RELEASES:**
- "Dryfting" — the signature track
- "All of Me" — emotional depth
- "Heart in Motion" — soulful storytelling
- "Without You" — raw vulnerability

**MERCH:**
- XO DRYFT branded t-shirts (black and white)
- XO DRYFT branded cups
- Available in the official store

Keep responses conversational, authentic, and enthusiastic. Use the Dryfting philosophy naturally. If someone asks something you don't know, stay in character and redirect to what you do know about XO DRYFT. Keep answers concise but meaningful — 2-4 sentences unless they ask for more detail.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
