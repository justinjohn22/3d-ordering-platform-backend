// api/orders.js

import { supabase } from "../lib/supabaseClient.js";

export default async function handler(req, res) {
    // 1) Check the Origin header and echo it back if it matches one of your allowed origins
    const allowedOrigins = [
        "http://localhost:3001",
        "https://3d-ordering-platform.vercel.app",
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    // 2) Other CORS headers
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // 3) Preflight support
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // 4) Normal GET / POST logic
    if (req.method === "GET") {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.error("Error fetching orders:", error);
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json(data);
    }

    if (req.method === "POST") {
        const {
            email,
            first_name,
            last_name,
            address,
            shoe_type,
            shoe_size,
            shoe_length,
            shoe_width,
            shoe_thickness,
            shoe_colour,
        } = req.body;

        // (validation omitted for brevity)

        const { data, error } = await supabase
            .from("orders")
            .insert([
                {
                    email,
                    first_name,
                    last_name,
                    address,
                    shoe_type,
                    shoe_size,
                    shoe_length,
                    shoe_width,
                    shoe_thickness,
                    shoe_colour,
                },
            ])
            .select();

        if (error) {
            console.error("Error creating order:", error);
            return res.status(500).json({ error: error.message });
        }
        return res.status(201).json(data[0]);
    }

    // 5) Method not allowed
    res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
