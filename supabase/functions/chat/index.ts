import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Spice, the friendly AI assistant for Spice Heaven — an authentic Indian restaurant. You help customers with:

- Menu recommendations based on taste preferences, dietary needs (veg/non-veg), and spice tolerance
- Information about dishes (ingredients, spice level, allergens)
- Help with ordering and the cart
- Restaurant info (hours: Mon-Sun 11AM-10PM, location: 123 Curry Lane, phone: (555) 123-4567)

Our menu includes:
STARTERS: Paneer Tikka (₹299, veg), Samosa (₹149, veg), Garlic Naan (₹99, veg), Tandoori Chicken (₹349)
MAIN COURSE: Butter Chicken (₹399), Hyderabadi Biryani (₹449), Masala Dosa (₹249, veg), Dal Makhani (₹329, veg), Palak Paneer (₹319, veg), Chole Bhature (₹279, veg), Chicken Tikka Masala (₹429), Aloo Gobi (₹249, veg), Fish Curry (₹479)
DESSERTS: Gulab Jamun (₹179, veg), Rasmalai (₹199, veg), Jalebi (₹129, veg)
BEVERAGES: Mango Lassi (₹149, veg), Masala Chai (₹99, veg), Sweet Lassi (₹129, veg)

Keep responses concise, warm, and helpful. Use occasional food emojis. If asked about things unrelated to the restaurant or food, politely redirect.`;

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
        return new Response(JSON.stringify({ error: "Too many requests. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
