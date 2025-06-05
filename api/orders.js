// api/orders.js
import { supabase } from "../lib/supabaseClient.js";

/**
 * Vercel Serverless Function handler.
 * For any HTTP request to /api/orders, this function runs:
 *   - GET: return all orders
 *   - POST: insert a new order
 */
export default async function handler(req, res) {
    // Allow only GET and POST
    if (req.method === "GET") {
        // Fetch all orders, sorted by created_at desc
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
        // Destructure fields from request body
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

        // Basic validation
        if (
            !email ||
            !first_name ||
            !last_name ||
            !address ||
            !shoe_type ||
            !shoe_size ||
            shoe_length == null ||
            !shoe_width ||
            !shoe_thickness ||
            !shoe_colour
        ) {
            return res.status(400).json({
                error:
                    "Missing required field. Provide all: email, first_name, last_name, address, shoe_type, shoe_size, shoe_length, shoe_width, shoe_thickness, shoe_colour.",
            });
        }

        // Insert into Supabase
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

        // Return the newly inserted row
        return res.status(201).json(data[0]);
    }

    // If any other HTTP method, return 405 Method Not Allowed
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
