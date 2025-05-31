let handler = async (m, { conn, args }) => {
     const user = global.db.data.users[m.sender];
     // Lista de animales que se pueden cazar
     const animals = ['tigre','elefante','cabra','panda','cocodrilo','bufalo','mono','jabali','chancho','gallo'];
 
     const recipes = {
         ayamb: { coal: 3, ingnova: 1, foodKey: 'ayamb' },
         sapir: { coal: 5, ingnova: 1, foodKey: 'sapir' },
         ssapi: { coal: 4, ingnova: 2, foodKey: 'ssapi' }
     };
     const recipeNames = Object.keys(recipes);
     const choice = args[0]?.toLowerCase();
 
     // Disponibilidad de animales
     const totalAnimals = animals.reduce((sum, a) => sum + (user[a] || 0), 0);
 
     // Mostrar menú con emojis
     if (!choice || !recipes[choice]) {
         let menu = '*🍳 Bienvenido a la cocina!*\n*Recetas disponibles según tu inventario:*';
         for (let key of recipeNames) {
             const r = recipes[key];
             const haveCoal = user.coal || 0;
             const haveIng = user.ingnova || 0;
             const canCook = haveCoal >= r.coal && haveIng >= r.ingnova && totalAnimals > 0;
             menu += `\n🥘 *${key.charAt(0).toUpperCase() + key.slice(1)}*`;
             menu += `\n   🔥 Carbón: ${haveCoal}/${r.coal}`;
             menu += `\n   ✨ Ingrediente Nova: ${haveIng}/${r.ingnova}`;
             menu += `\n   🐾 Animales: ${totalAnimals}/1`;
             menu += canCook ? `\n   👉 _Usa .cocinar ${key}_` : `\n   ❌ No puedes cocinar esta receta`;
             menu += '\n';
         }
         return conn.reply(m.chat, menu.trim(), m);
     }
 
     // Cocinar receta seleccionada
     const recipe = recipes[choice];
     const haveCoal = user.coal || 0;
     const haveIng = user.ingnova || 0;
     if (haveCoal < recipe.coal) return conn.reply(m.chat, `❌ Te faltan ${recipe.coal - haveCoal} carbón. (.buy coal)`, m);
     if (haveIng < recipe.ingnova) return conn.reply(m.chat, `❌ Te faltan ${recipe.ingnova - haveIng} Ingrediente Nova. (.buy ingnova)`, m);
     if (totalAnimals < 1) return conn.reply(m.chat, '❌ No tenés ningún animal para cocinar. (.cazar)', m);
     // Consumir primer animal disponible
     const animalsKeys = animals.filter(a => user[a] > 0);
     const animalKey = animalsKeys[0];
 
     // Consumir ingredientes
     user.coal -= recipe.coal;
     user.ingnova -= recipe.ingnova;
     user[animalKey]--;
     user[recipe.foodKey] = (user[recipe.foodKey] || 0) + 1;
 
     return conn.reply(m.chat,
         `✅ Cocinaste 1 unidad de *${choice}*!
 ` +
         `Ingredientes usados:
 ` +
         `- 🔥 ${recipe.coal} carbón
 ` +
         `- ✨ ${recipe.ingnova} Ingrediente Nova
 ` +
         `- 🐾 1 ${animalKey}
 
 ` +
         `Ahora tenés *${user[recipe.foodKey]}* de ${choice}.`,
         m
     );
 };
 
 handler.help = ['cocinar', 'cocinar <receta>'];
 handler.tags = ['rpg'];
 handler.command = /^(cocinar|cook)$/i;
     handler.register = true;
     handler.rowner = false;
 export default handler;
 