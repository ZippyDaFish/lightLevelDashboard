import { json } from '@sveltejs/kit';
import { getValues } from '$lib/arduino';

export async function GET() {
    return json({ data: getValues() });
}