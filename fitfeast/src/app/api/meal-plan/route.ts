import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || 'vegetarian';

  const appId = process.env.EDAMAM_APP_ID;
  const apiKey = process.env.EDAMAM_API_KEY;

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${apiKey}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Edamam-Account-User': 'Dhwani2205'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Edamam API error:', errText);
      return NextResponse.json({ error: 'Failed to fetch meals' }, { status: response.status });
    }

    const data = await response.json();

    const meals = data.hits.slice(0, 5).map((hit: any) => ({
      name: hit.recipe.label,
      calories: Math.round(hit.recipe.calories / hit.recipe.yield),
      image: hit.recipe.image,
      cost: (Math.random() * 5 + 2).toFixed(2),
    }));

    return NextResponse.json(meals);
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch meals' }, { status: 500 });
  }
}
