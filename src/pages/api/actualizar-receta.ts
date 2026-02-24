// src/pages/api/actualizar-receta.ts
import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  
  const id = formData.get("id");
  const platillo = formData.get("platillo");
  const link = formData.get("link");
  const nota = formData.get("nota");
  
  // Obtenemos los arrays de ingredientes
  const ingredientesFinales = formData.getAll("ingredientes_finales");
  const nuevosIngredientesData = formData.getAll("nuevos_ingredientes_data");

  try {
    // 1. Si hay ingredientes nuevos, los insertamos primero en la tabla 'ingredientes'
    if (nuevosIngredientesData.length > 0) {
      const nuevosIngredientes = nuevosIngredientesData.map((data) => 
        JSON.parse(data as string)
      );
      
      const { error: errorIngredientes } = await supabase
        .from("ingredientes")
        .upsert(nuevosIngredientes, { onConflict: 'nombre' }); // Evita duplicados si ya existen

      if (errorIngredientes) throw errorIngredientes;
    }

    // 2. Actualizamos la receta en la tabla 'recetas'
    const { error: errorReceta } = await supabase
      .from("recetas")
      .update({
        platillo,
        ingredientes: ingredientesFinales, // Supabase guarda esto como array JSONB o Text[]
        link,
        nota
      })
      .eq("id", id); // Filtramos por el ID que recibimos del modal

    if (errorReceta) throw errorReceta;

    // Redirigimos con mensaje de éxito
    return redirect("/recetas?msg=success", 303);

  } catch (error: any) {
    console.error("Error actualizando receta:", error.message);
    return redirect(`/recetas?msg=error&detail=${encodeURIComponent(error.message)}`, 303);
  }
};