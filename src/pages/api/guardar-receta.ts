import { supabase } from '../../lib/supabase';

export const POST = async ({ request, redirect }) => {
  try {
    const data = await request.formData();
    
    const platillo = data.get('platillo');
    const nota = data.get('nota');
    const link = data.get('link-receta');
    const ingredientesFinales = data.getAll('ingredientes_finales');
    const nuevosIngredientesData = data.getAll('nuevos_ingredientes_data');

    // 1. Guardar los ingredientes nuevos en el catálogo
    if (nuevosIngredientesData.length > 0) {
      const filasNuevas = nuevosIngredientesData.map(item => {
        const d = JSON.parse(item); // Aquí recibimos el objeto del JS del frontend
        return {
          nombre: d.nombre,
          precio: parseFloat(d.precio) || 0,
          tienda: d.tienda,
          departamento: d.departamento, // <--- CAMBIO: Ahora usa el del select
          es_porcionable: d.es_porcionable // <--- CAMBIO: Ahora usa el del checkbox
        };
      });

      const { error: ingError } = await supabase
        .from('ingredientes')
        .insert(filasNuevas);
      
      if (ingError) throw ingError;
    }

    // 2. Guardar la receta con su array de nombres
    const { error: recError } = await supabase
      .from('recetas')
      .insert([{
        platillo,
        ingredientes: ingredientesFinales,
        nota,
        link
      }]);

    if (recError) throw recError;

    return redirect('/recetas?success=true');

  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
};