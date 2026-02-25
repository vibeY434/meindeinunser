import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function main() {
    const { data, error } = await supabase
        .from("listings")
        .select("*, profiles(id, display_name)");

    console.log("Error:", error);
    console.log("Listings:", JSON.stringify(data, null, 2));
}

main();
