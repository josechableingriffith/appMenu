import { supabase } from '../../lib/supabase';

export const POST = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    
    const fechas = formData.getAll('fecha');
    const comidas1 = formData.getAll('comida_1');
    const comidas2 = formData.getAll('comida_2');

    // Filtramos para no guardar filas donde no se seleccionó nada
    const rows = fechas.map((fecha, i) => ({
      fecha,
      comida_1: comidas1[i] || null,
      comida_2: comidas2[i] || null,
    })).filter(row => row.comida_1 || row.comida_2);

    // --- LÓGICA DE LIMPIEZA ---
    const hoy = new Date();
    const diaSemana = hoy.getDay(); 
    const diasDesdeJueves = (diaSemana - 4 + 7) % 7;
    const juevesActual = new Date(hoy);
    juevesActual.setDate(hoy.getDate() - diasDesdeJueves);
    const juevesIso = juevesActual.toISOString().split('T')[0];

    // 1. Eliminamos lo antiguo (menor al jueves actual)
    const { error: deleteError } = await supabase
      .from('menu_semana')
      .delete()
      .lt('fecha', juevesIso);

    if (deleteError) throw deleteError;

    // 2. Insertamos o actualizamos (Upsert requiere que 'fecha' sea Primary Key o Unique en Supabase)
    const { error: upsertError } = await supabase
      .from('menu_semana')
      .upsert(rows, { onConflict: 'fecha' }); 

    if (upsertError) throw upsertError;

    // REDIRECCIÓN: Muy importante para que el usuario vuelva a la web
    return redirect('/crear-menu?msg=success', 303);

  } catch (error) {
    console.error("Error en API:", error.message);
    const errorMsg = encodeURIComponent(error.message);
    return redirect(`/crear-menu?msg=error&detail=${errorMsg}`, 303);
  }
};