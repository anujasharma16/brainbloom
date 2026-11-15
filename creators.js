/* "AI for Creators" path: brainstorming, writing in your own voice, image prompts, video and audio workflows, and
   honest, safe use of AI (copyright, disclosure, consent). Legal points are general only. Loaded after trading.js
   (uses T4, mc, tf, match, order, _sc, INTROS, SUMMARIES, PATHS). */

const CREATORS = {
  id: 'creators', icon: '🎨',
  title: T4('AI for Creators', 'L’IA pour les créateurs', 'IA para creadores', 'क्रिएटर्स के लिए AI'),
  desc: T4('Use AI to spark ideas, write in your own voice, make visuals and videos, and share your work honestly and safely.',
    'Utilisez l’IA pour trouver des idées, écrire avec votre propre voix, créer des visuels et des vidéos, et partager votre travail honnêtement et en toute sécurité.',
    'Usa la IA para sacar ideas, escribir con tu propia voz, crear imágenes y videos, y compartir tu trabajo con honestidad y seguridad.',
    'AI से आइडिया निकालें, अपनी आवाज़ में लिखें, विज़ुअल और वीडियो बनाएँ, और अपना काम ईमानदारी और सुरक्षा से साझा करें।'),
  notice: T4('Rules about copyright and AI differ by country. This is for learning, not legal advice.',
    'Les règles sur le droit d’auteur et l’IA varient selon les pays. Ce parcours sert à apprendre, ce n’est pas un avis juridique.',
    'Las reglas sobre derechos de autor e IA cambian según el país. Esto es para aprender, no es asesoría legal.',
    'कॉपीराइट और AI के नियम हर देश में अलग होते हैं। यह सीखने के लिए है, कानूनी सलाह नहीं।'),
  badge: { icon: '🎨', title: T4('Creative Spark', 'Étincelle créative', 'Chispa creativa', 'रचनात्मक चिंगारी'),
    desc: T4('Finish the AI for Creators path', 'Terminez le parcours L’IA pour les créateurs', 'Termina el camino IA para creadores', 'क्रिएटर्स के लिए AI पथ पूरा करें') },
  lessons: [
    {
      id: 'cr-ideas', icon: '💡',
      title: T4('Beating the blank page', 'Vaincre la page blanche', 'Vencer la página en blanco', 'खाली पन्ने को हराना'),
      questions: [
        mc(T4('You run a plant blog and need video ideas. Which prompt will give you the most useful list?', 'Vous tenez un blogue sur les plantes et cherchez des idées de vidéos. Quel prompt donnera la liste la plus utile ?', 'Tienes un blog de plantas y necesitas ideas de video. ¿Qué prompt te dará la lista más útil?', 'आप पौधों का ब्लॉग चलाते हैं और वीडियो के आइडिया चाहिए। कौन-सा प्रॉम्प्ट सबसे काम की सूची देगा?'),
          T4(['Give me ideas.', 'Plants videos please.', 'Give me 10 video ideas for beginners who keep killing houseplants. Each idea needs a catchy title and a one-line hook. Keep them under 3 minutes and use a friendly tone.', 'Write my whole channel plan for the year.'],
            ['Donne-moi des idées.', 'Des vidéos sur les plantes, s’il te plaît.', 'Donne-moi 10 idées de vidéos pour des débutants qui font mourir leurs plantes d’intérieur. Chaque idée a un titre accrocheur et une accroche d’une ligne. Moins de 3 minutes, ton amical.', 'Écris tout le plan de ma chaîne pour l’année.'],
            ['Dame ideas.', 'Videos de plantas, por favor.', 'Dame 10 ideas de video para principiantes a los que se les mueren las plantas de interior. Cada idea con un título llamativo y un gancho de una línea. Menos de 3 minutos y tono amistoso.', 'Escribe todo el plan de mi canal para el año.'],
            ['मुझे आइडिया दो।', 'पौधों पर वीडियो चाहिए।', 'उन शुरुआती लोगों के लिए 10 वीडियो आइडिया दो जिनके घर के पौधे बार-बार मर जाते हैं। हर आइडिया का एक आकर्षक शीर्षक और एक पंक्ति का हुक हो। 3 मिनट से कम, दोस्ताना लहजा।', 'मेरे चैनल की पूरे साल की योजना लिख दो।']),
          2,
          T4('Say who it is for, how many ideas, what each one needs and the tone. Clear details give better ideas.',
            'Dites pour qui, combien d’idées, ce que chacune doit contenir et le ton. Des détails clairs donnent de meilleures idées.',
            'Di para quién es, cuántas ideas, qué debe tener cada una y el tono. Los detalles claros dan mejores ideas.',
            'बताएँ कि किसके लिए है, कितने आइडिया, हर आइडिया में क्या हो और लहजा कैसा हो। साफ़ जानकारी से बेहतर आइडिया मिलते हैं।')),
        order(T4('Put a good brainstorming loop in order', 'Mettez dans l’ordre une bonne boucle de remue-méninges', 'Ordena un buen ciclo de lluvia de ideas', 'विचार-मंथन की अच्छी प्रक्रिया को सही क्रम में लगाएँ'),
          T4(['Ask AI for many different ideas', 'Pick the two or three you like most', 'Ask AI to expand or twist those ideas', 'Make the final choice yourself'],
            ['Demander à l’IA beaucoup d’idées différentes', 'Choisir les deux ou trois que vous préférez', 'Demander à l’IA de développer ou de détourner ces idées', 'Faire le choix final vous-même'],
            ['Pedir a la IA muchas ideas distintas', 'Elegir las dos o tres que más te gusten', 'Pedir a la IA que amplíe o cambie esas ideas', 'Tomar tú mismo la decisión final'],
            ['AI से कई अलग-अलग आइडिया माँगें', 'उनमें से सबसे पसंदीदा दो-तीन चुनें', 'AI से उन आइडिया को बढ़ाने या नया मोड़ देने को कहें', 'अंतिम फ़ैसला खुद लें'])),
        tf(T4('The first answer AI gives is usually the best one, so you should not ask for changes.', 'La première réponse de l’IA est en général la meilleure, donc inutile de demander des changements.', 'La primera respuesta de la IA suele ser la mejor, así que no hace falta pedir cambios.', 'AI का पहला जवाब आमतौर पर सबसे अच्छा होता है, इसलिए बदलाव माँगने की ज़रूरत नहीं।'),
          false,
          T4('Iterating works better. Ask for a different angle, a shorter version or a bolder tone, and keep what you like.',
            'Itérer est plus efficace. Demandez un autre angle, une version plus courte ou un ton plus audacieux, et gardez ce qui vous plaît.',
            'Iterar funciona mejor. Pide otro enfoque, una versión más corta o un tono más atrevido, y quédate con lo que te guste.',
            'बार-बार सुधारना बेहतर रहता है। दूसरा नज़रिया, छोटा रूप या ज़्यादा बोल्ड लहजा माँगें, और जो पसंद आए उसे रखें।')),
      ],
    },
    {
      id: 'cr-writing', icon: '✍️',
      title: T4('Writing in your own voice', 'Écrire avec votre propre voix', 'Escribir con tu propia voz', 'अपनी आवाज़ में लिखना'),
      questions: [
        mc(T4('You wrote a draft and want AI to polish it without changing your voice. Which prompt is best?', 'Vous avez écrit un brouillon et voulez que l’IA le peaufine sans changer votre voix. Quel prompt est le meilleur ?', 'Escribiste un borrador y quieres que la IA lo pula sin cambiar tu voz. ¿Qué prompt es el mejor?', 'आपने एक ड्राफ़्ट लिखा है और चाहते हैं कि AI आपकी आवाज़ बदले बिना उसे सुधारे। कौन-सा प्रॉम्प्ट सबसे अच्छा है?'),
          T4(['Fix the typos and clumsy sentences in my draft below, but keep my casual, funny voice and my word choices. Show your changes as a list. [paste draft]', 'Rewrite this to sound professional.', 'Make it better.', 'Write a new post on this topic instead.'],
            ['Corrige les fautes et les phrases maladroites de mon brouillon ci-dessous, mais garde ma voix décontractée et drôle et mes choix de mots. Montre tes changements sous forme de liste. [coller le brouillon]', 'Réécris ça pour que ça sonne professionnel.', 'Améliore-le.', 'Écris plutôt un nouvel article sur ce sujet.'],
            ['Corrige los errores y las frases torpes de mi borrador de abajo, pero conserva mi voz informal y divertida y mis palabras. Muestra los cambios en una lista. [pegar borrador]', 'Reescribe esto para que suene profesional.', 'Hazlo mejor.', 'Escribe mejor una publicación nueva sobre el tema.'],
            ['नीचे के मेरे ड्राफ़्ट की गलतियाँ और बेढंगे वाक्य ठीक करो, लेकिन मेरा बेफ़िक्र, मज़ाकिया अंदाज़ और मेरे शब्द रखो। बदलाव सूची में दिखाओ। [ड्राफ़्ट पेस्ट करें]', 'इसे प्रोफ़ेशनल लगने वाला बना दो।', 'इसे बेहतर बना दो।', 'इसके बदले इसी विषय पर नई पोस्ट लिख दो।']),
          0,
          T4('Tell AI what to keep and what to fix, and ask to see the changes. That way the voice stays yours.',
            'Dites à l’IA ce qu’il faut garder et corriger, et demandez de voir les changements. Ainsi la voix reste la vôtre.',
            'Dile a la IA qué conservar y qué corregir, y pide ver los cambios. Así la voz sigue siendo tuya.',
            'AI को बताएँ कि क्या रखना है और क्या सुधारना है, और बदलाव दिखाने को कहें। इस तरह आवाज़ आपकी ही रहती है।')),
        match(T4('Match each writing job with a good way to use AI', 'Associez chaque tâche d’écriture à une bonne façon d’utiliser l’IA', 'Relaciona cada tarea de escritura con una buena forma de usar la IA', 'हर लेखन-काम को AI के अच्छे उपयोग से मिलाएँ'),
          T4([['Style guide', 'Paste samples of your writing and ask AI to describe your voice'], ['Outline', 'Ask for a section-by-section structure to fill in yourself'], ['Editing', 'Ask for feedback on clarity and flow, not a rewrite'], ['Headlines', 'Ask for 10 options, then pick and tweak one']],
            [['Guide de style', 'Collez des extraits de vos textes et demandez à l’IA de décrire votre voix'], ['Plan', 'Demandez une structure section par section à remplir vous-même'], ['Révision', 'Demandez des commentaires sur la clarté et le rythme, pas une réécriture'], ['Titres', 'Demandez 10 options, puis choisissez-en une et ajustez-la']],
            [['Guía de estilo', 'Pega muestras de tu escritura y pide a la IA que describa tu voz'], ['Esquema', 'Pide una estructura por secciones para completar tú'], ['Edición', 'Pide comentarios sobre claridad y fluidez, no una reescritura'], ['Titulares', 'Pide 10 opciones, luego elige una y retócala']],
            [['स्टाइल गाइड', 'अपने लेखन के नमूने चिपकाएँ और AI से अपनी आवाज़ का वर्णन करवाएँ'], ['रूपरेखा', 'भाग-दर-भाग ढाँचा माँगें जिसे आप खुद भरें'], ['संपादन', 'स्पष्टता और प्रवाह पर राय माँगें, दोबारा लिखवाना नहीं'], ['शीर्षक', '10 विकल्प माँगें, फिर एक चुनकर सुधारें']])),
        tf(T4('A style guide you write once can be pasted into later prompts so AI matches your tone.', 'Un guide de style rédigé une fois peut être collé dans vos prompts suivants pour que l’IA respecte votre ton.', 'Una guía de estilo que escribes una vez se puede pegar en prompts futuros para que la IA imite tu tono.', 'एक बार लिखी स्टाइल गाइड को आगे के प्रॉम्प्ट में चिपकाया जा सकता है ताकि AI आपके लहजे से मेल खाए।'),
          true,
          T4('A short list like "friendly, short sentences, no jargon, use humour" gives AI a steady target every time.',
            'Une courte liste comme « amical, phrases courtes, pas de jargon, de l’humour » donne à l’IA une cible stable à chaque fois.',
            'Una lista corta como «amistoso, frases cortas, sin jerga, con humor» le da a la IA un objetivo constante.',
            '"दोस्ताना, छोटे वाक्य, कोई कठिन शब्द नहीं, थोड़ा हास्य" जैसी छोटी सूची AI को हर बार एक स्थिर लक्ष्य देती है।')),
      ],
    },
    {
      id: 'cr-visual', icon: '🖼️',
      title: T4('Prompting for images', 'Écrire des prompts pour les images', 'Prompts para imágenes', 'इमेज के लिए प्रॉम्प्ट लिखना'),
      questions: [
        mc(T4('You need a cover picture for a cosy autumn playlist. Which image prompt is best?', 'Il vous faut une image de couverture pour une playlist d’automne tout en douceur. Quel prompt d’image est le meilleur ?', 'Necesitas una portada para una playlist otoñal y acogedora. ¿Qué prompt de imagen es el mejor?', 'आपको एक आरामदायक पतझड़ प्लेलिस्ट के लिए कवर तस्वीर चाहिए। कौन-सा इमेज प्रॉम्प्ट सबसे अच्छा है?'),
          T4(['A nice picture.', 'A cosy reading nook by a rainy window with a mug and a blanket, soft watercolor style, warm golden lamp light, close-up from above, muted orange and brown colors, no text or logos.', 'Autumn, best quality, amazing, wow.', 'Make something that looks like it was made by a famous painter.'],
            ['Une belle image.', 'Un coin lecture douillet près d’une fenêtre pluvieuse avec une tasse et une couverture, style aquarelle doux, lumière chaude et dorée d’une lampe, gros plan vu d’en haut, couleurs orange et brun tamisées, sans texte ni logo.', 'Automne, meilleure qualité, génial, wow.', 'Fais quelque chose qui ressemble à l’œuvre d’un peintre célèbre.'],
            ['Una imagen bonita.', 'Un rincón de lectura acogedor junto a una ventana con lluvia, con una taza y una manta, estilo acuarela suave, luz cálida y dorada de lámpara, primer plano desde arriba, colores naranja y marrón apagados, sin texto ni logotipos.', 'Otoño, la mejor calidad, increíble, guau.', 'Haz algo que parezca hecho por un pintor famoso.'],
            ['एक अच्छी तस्वीर।', 'बारिश वाली खिड़की के पास पढ़ने का आरामदायक कोना, जिसमें कप और कंबल हैं, हल्का जलरंग शैली, लैंप की गर्म सुनहरी रोशनी, ऊपर से क्लोज़-अप, फीके नारंगी और भूरे रंग, कोई टेक्स्ट या लोगो नहीं।', 'पतझड़, सबसे बढ़िया क्वालिटी, कमाल, वाह।', 'ऐसा कुछ बनाओ जो किसी मशहूर चित्रकार का बनाया लगे।']),
          1,
          T4('A good image prompt names the subject, style, lighting, composition and colors, and says what to leave out.',
            'Un bon prompt d’image nomme le sujet, le style, l’éclairage, la composition et les couleurs, et dit ce qu’il faut exclure.',
            'Un buen prompt de imagen nombra el sujeto, el estilo, la luz, la composición y los colores, y dice qué dejar fuera.',
            'अच्छा इमेज प्रॉम्प्ट विषय, शैली, रोशनी, संयोजन और रंग बताता है, और यह भी कि क्या नहीं चाहिए।')),
        match(T4('Match each part of an image prompt with an example', 'Associez chaque élément d’un prompt d’image à un exemple', 'Relaciona cada parte de un prompt de imagen con un ejemplo', 'इमेज प्रॉम्प्ट के हर हिस्से को उदाहरण से मिलाएँ'),
          T4([['Subject', 'A red fox sleeping in a teacup'], ['Style', 'Flat vector illustration'], ['Lighting', 'Soft light from a sunrise'], ['Negative constraint', 'No text, no extra fingers']],
            [['Sujet', 'Un renard roux endormi dans une tasse de thé'], ['Style', 'Illustration vectorielle à plat'], ['Éclairage', 'Lumière douce d’un lever de soleil'], ['Contrainte négative', 'Pas de texte, pas de doigts en trop']],
            [['Sujeto', 'Un zorro rojo durmiendo en una taza de té'], ['Estilo', 'Ilustración vectorial plana'], ['Luz', 'Luz suave de un amanecer'], ['Restricción negativa', 'Sin texto, sin dedos de más']],
            [['विषय', 'चाय के प्याले में सोती एक लाल लोमड़ी'], ['शैली', 'सपाट वेक्टर चित्रण'], ['रोशनी', 'सूर्योदय की हल्की रोशनी'], ['नकारात्मक शर्त', 'कोई टेक्स्ट नहीं, फ़ालतू उँगलियाँ नहीं']])),
        mc(T4('The first image is nice, but the background is too busy. What should you type next?', 'La première image est jolie, mais l’arrière-plan est trop chargé. Que devez-vous écrire ensuite ?', 'La primera imagen es bonita, pero el fondo está muy cargado. ¿Qué debes escribir ahora?', 'पहली तस्वीर अच्छी है, लेकिन पृष्ठभूमि बहुत भरी हुई है। आपको आगे क्या लिखना चाहिए?'),
          T4(['Try again.', 'Make it better.', 'Start over with a completely different idea.', 'Keep the same fox and style, but use a plain pale-blue background with lots of empty space.'],
            ['Réessaie.', 'Fais mieux.', 'Recommence avec une idée complètement différente.', 'Garde le même renard et le même style, mais avec un fond uni bleu pâle et beaucoup d’espace vide.'],
            ['Inténtalo otra vez.', 'Hazlo mejor.', 'Empieza de nuevo con una idea totalmente distinta.', 'Conserva el mismo zorro y estilo, pero con un fondo liso azul pálido y mucho espacio vacío.'],
            ['फिर से कोशिश करो।', 'इसे बेहतर बनाओ।', 'बिल्कुल अलग आइडिया से दोबारा शुरू करो।', 'वही लोमड़ी और वही शैली रखो, पर पृष्ठभूमि सादा हल्की नीली हो और खाली जगह खूब हो।']),
          3,
          T4('Change one thing at a time and say what to keep. Small, clear edits steer the picture.',
            'Changez une chose à la fois et dites ce qu’il faut garder. De petites retouches claires guident l’image.',
            'Cambia una cosa a la vez y di qué conservar. Ajustes pequeños y claros guían la imagen.',
            'एक बार में एक चीज़ बदलें और बताएँ कि क्या रखना है। छोटे, साफ़ बदलाव तस्वीर को सही दिशा देते हैं।')),
      ],
    },
    {
      id: 'cr-video-audio', icon: '🎬',
      title: T4('Video, audio and repurposing', 'Vidéo, audio et réutilisation', 'Video, audio y reutilización', 'वीडियो, ऑडियो और दोबारा उपयोग'),
      questions: [
        mc(T4('You want a 60-second script for a short video about saving water. Which prompt is best?', 'Vous voulez un script de 60 secondes pour une courte vidéo sur les économies d’eau. Quel prompt est le meilleur ?', 'Quieres un guion de 60 segundos para un video corto sobre ahorrar agua. ¿Qué prompt es el mejor?', 'आप पानी बचाने पर एक छोटे वीडियो के लिए 60 सेकंड की स्क्रिप्ट चाहते हैं। कौन-सा प्रॉम्प्ट सबसे अच्छा है?'),
          T4(['Write a video.', 'Water video script.', 'Make a viral video for me.', 'Write a 60-second script for a short video on saving water at home, for teenagers. Start with a hook in 5 seconds, give 3 quick tips and end with one call to action. Use two columns: what we see and what we say.'],
            ['Écris une vidéo.', 'Script vidéo sur l’eau.', 'Fais-moi une vidéo virale.', 'Écris un script de 60 secondes pour une courte vidéo sur les économies d’eau à la maison, pour des ados. Commence par une accroche de 5 secondes, donne 3 conseils rapides et termine par un appel à l’action. Utilise deux colonnes : ce qu’on voit et ce qu’on dit.'],
            ['Escribe un video.', 'Guion de video sobre agua.', 'Hazme un video viral.', 'Escribe un guion de 60 segundos para un video corto sobre ahorrar agua en casa, para adolescentes. Empieza con un gancho de 5 segundos, da 3 consejos rápidos y termina con una llamada a la acción. Usa dos columnas: lo que se ve y lo que se dice.'],
            ['एक वीडियो लिखो।', 'पानी पर वीडियो स्क्रिप्ट।', 'मेरे लिए वायरल वीडियो बना दो।', 'किशोरों के लिए घर पर पानी बचाने पर 60 सेकंड की स्क्रिप्ट लिखो। पहले 5 सेकंड में हुक हो, 3 झटपट सुझाव हों और अंत में एक कॉल टू एक्शन हो। दो कॉलम रखो: हम क्या देखते हैं और हम क्या कहते हैं।']),
          3,
          T4('Give the length, audience, structure and format. A two-column script is easy to film from.',
            'Précisez la durée, le public, la structure et le format. Un script en deux colonnes est facile à tourner.',
            'Indica la duración, el público, la estructura y el formato. Un guion en dos columnas es fácil de grabar.',
            'अवधि, दर्शक, ढाँचा और फ़ॉर्मैट बताएँ। दो कॉलम वाली स्क्रिप्ट से शूट करना आसान होता है।')),
        order(T4('Put a simple video-making workflow in order', 'Mettez dans l’ordre un déroulé simple de création vidéo', 'Ordena un flujo sencillo para hacer un video', 'वीडियो बनाने की सरल प्रक्रिया को सही क्रम में लगाएँ'),
          T4(['Write the script', 'Sketch a storyboard of the shots', 'Record and edit the video', 'Add captions and check them'],
            ['Écrire le script', 'Esquisser un storyboard des plans', 'Filmer et monter la vidéo', 'Ajouter des sous-titres et les vérifier'],
            ['Escribir el guion', 'Dibujar un storyboard de las tomas', 'Grabar y editar el video', 'Añadir subtítulos y revisarlos'],
            ['स्क्रिप्ट लिखें', 'शॉट्स का स्टोरीबोर्ड बनाएँ', 'वीडियो रिकॉर्ड और एडिट करें', 'कैप्शन जोड़ें और उन्हें जाँचें'])),
        match(T4('Match one idea with the format it can become', 'Associez une idée au format qu’elle peut devenir', 'Relaciona una idea con el formato en que puede convertirse', 'एक आइडिया को उस फ़ॉर्मैट से मिलाएँ जिसमें वह बदल सकता है'),
          T4([['A blog post', 'A 5-slide carousel of key points'], ['A long video', 'Short clips with captions'], ['A podcast episode', 'A written summary and quote cards'], ['A tutorial', 'A checklist people can save']],
            [['Un article de blogue', 'Un carrousel de 5 diapos avec les points clés'], ['Une longue vidéo', 'De courts extraits avec sous-titres'], ['Un épisode de balado', 'Un résumé écrit et des cartes de citations'], ['Un tutoriel', 'Une liste de contrôle à enregistrer']],
            [['Una entrada de blog', 'Un carrusel de 5 diapositivas con los puntos clave'], ['Un video largo', 'Clips cortos con subtítulos'], ['Un episodio de pódcast', 'Un resumen escrito y tarjetas de citas'], ['Un tutorial', 'Una lista de verificación que se pueda guardar']],
            [['ब्लॉग पोस्ट', 'मुख्य बिंदुओं वाला 5 स्लाइड का कैरोसेल'], ['लंबा वीडियो', 'कैप्शन वाले छोटे क्लिप'], ['पॉडकास्ट एपिसोड', 'लिखित सार और उद्धरण कार्ड'], ['ट्यूटोरियल', 'सहेजने लायक चेकलिस्ट']])),
      ],
    },
    {
      id: 'cr-ethics', icon: '⚖️',
      title: T4('Creating honestly and safely', 'Créer avec honnêteté et en sécurité', 'Crear con honestidad y seguridad', 'ईमानदारी और सुरक्षा से रचना'),
      questions: [
        mc(T4('Which is the most responsible way to use AI for your art?', 'Quelle est la façon la plus responsable d’utiliser l’IA pour votre art ?', '¿Cuál es la forma más responsable de usar la IA en tu arte?', 'अपनी कला में AI का उपयोग करने का सबसे ज़िम्मेदार तरीका कौन-सा है?'),
          T4(['Use it as a helper, add your own ideas and edits, and say when AI helped', 'Ask for work in the exact style of a living artist and sell it as theirs', 'Hide that you used AI so nobody asks questions', 'Post a realistic video of a real person without asking them'],
            ['L’utiliser comme aide, y ajouter vos idées et retouches, et dire quand l’IA a aidé', 'Demander une œuvre dans le style exact d’un artiste vivant et la vendre comme la sienne', 'Cacher que vous avez utilisé l’IA pour éviter les questions', 'Publier une vidéo réaliste d’une vraie personne sans lui demander'],
            ['Usarla como ayudante, añadir tus ideas y ediciones, y decir cuándo ayudó la IA', 'Pedir una obra con el estilo exacto de un artista vivo y venderla como suya', 'Ocultar que usaste IA para que nadie pregunte', 'Publicar un video realista de una persona real sin preguntarle'],
            ['इसे सहायक की तरह इस्तेमाल करें, अपने आइडिया और संपादन जोड़ें, और बताएँ कि AI ने कब मदद की', 'किसी जीवित कलाकार की हू-ब-हू शैली में काम बनवाकर उसके नाम से बेचना', 'AI के इस्तेमाल को छिपाना ताकि कोई सवाल न पूछे', 'किसी असली व्यक्ति की यथार्थ-सा दिखने वाला वीडियो उसकी अनुमति के बिना पोस्ट करना']),
          0,
          T4('Be open about AI, add your own work, respect other artists and never use someone’s face or voice without consent.',
            'Soyez transparent sur l’IA, ajoutez votre propre travail, respectez les autres artistes et n’utilisez jamais le visage ou la voix de quelqu’un sans son accord.',
            'Sé transparente con el uso de IA, aporta tu propio trabajo, respeta a otros artistas y nunca uses la cara o la voz de alguien sin su consentimiento.',
            'AI के बारे में खुलकर बताएँ, अपना काम जोड़ें, दूसरे कलाकारों का सम्मान करें और किसी का चेहरा या आवाज़ उसकी सहमति के बिना कभी इस्तेमाल न करें।')),
        tf(T4('If AI writes a fact in your article, you still need to check it before you publish.', 'Si l’IA écrit un fait dans votre article, vous devez quand même le vérifier avant de publier.', 'Si la IA escribe un dato en tu artículo, aun así debes comprobarlo antes de publicar.', 'अगर AI आपके लेख में कोई तथ्य लिखे, तब भी प्रकाशित करने से पहले आपको उसे जाँचना होगा।'),
          true,
          T4('AI can make things up. You are the one who publishes, so you are responsible for what is true.',
            'L’IA peut inventer des choses. C’est vous qui publiez, donc vous êtes responsable de l’exactitude.',
            'La IA puede inventar cosas. Tú eres quien publica, así que eres responsable de que sea verdad.',
            'AI कुछ भी गढ़ सकता है। प्रकाशित आप करते हैं, इसलिए सच के लिए आप ज़िम्मेदार हैं।')),
        match(T4('Match each ethics idea with its meaning', 'Associez chaque notion d’éthique à sa signification', 'Relaciona cada idea ética con su significado', 'हर नैतिक विचार को उसके अर्थ से मिलाएँ'),
          T4([['Disclosure', 'Telling your audience when AI helped make the work'], ['Consent', 'Getting permission before using someone’s face or voice'], ['Training data', 'The work an AI model learned from, which can raise copyright questions'], ['Platform rules', 'Each site’s own policy on AI content that you should read']],
            [['Transparence', 'Dire à votre public quand l’IA a aidé à créer l’œuvre'], ['Consentement', 'Obtenir la permission avant d’utiliser le visage ou la voix de quelqu’un'], ['Données d’entraînement', 'Les œuvres dont un modèle d’IA a appris, ce qui peut soulever des questions de droit d’auteur'], ['Règles des plateformes', 'La politique propre à chaque site sur les contenus d’IA, à lire attentivement']],
            [['Divulgación', 'Decir a tu audiencia cuándo la IA ayudó a crear la obra'], ['Consentimiento', 'Pedir permiso antes de usar la cara o la voz de alguien'], ['Datos de entrenamiento', 'Las obras de las que aprendió un modelo de IA, lo que puede plantear dudas de derechos de autor'], ['Reglas de plataforma', 'La política de cada sitio sobre contenido de IA, que conviene leer']],
            [['खुलासा', 'दर्शकों को बताना कि काम बनाने में AI ने कब मदद की'], ['सहमति', 'किसी का चेहरा या आवाज़ इस्तेमाल करने से पहले उसकी अनुमति लेना'], ['ट्रेनिंग डेटा', 'वह सामग्री जिससे AI मॉडल ने सीखा, जिससे कॉपीराइट के सवाल उठ सकते हैं'], ['प्लेटफ़ॉर्म के नियम', 'AI सामग्री पर हर साइट की अपनी नीति, जिसे पढ़ना चाहिए']])),
      ],
    },
  ],
};

/* ---------- register the path, its stories and summaries ---------- */
(() => {
  PATHS.push(CREATORS);

  INTROS['cr-ideas'] = [
    _sc('bunny', 'Bruno, I stare at a blank page and nothing comes. Can AI help me find ideas?', 'Bruno, je fixe une page blanche et rien ne vient. L’IA peut m’aider à trouver des idées ?', 'Bruno, miro una página en blanco y no se me ocurre nada. ¿Puede ayudarme la IA con ideas?', 'ब्रूनो, मैं खाली पन्ने को देखती रहती हूँ और कुछ सूझता नहीं। क्या AI आइडिया ढूँढने में मदद कर सकता है?', '🐰 📄 ❓'),
    _sc('bear', 'Yes! Tell it your topic, your audience and how many ideas you want. It gives you a pile to choose from.', 'Oui ! Donnez-lui votre sujet, votre public et le nombre d’idées voulues. Il vous offre un tas d’options.', '¡Sí! Dile tu tema, tu público y cuántas ideas quieres. Te da un montón para elegir.', 'हाँ! उसे अपना विषय, दर्शक और कितने आइडिया चाहिए, बताइए। वह चुनने के लिए ढेर सारे विकल्प देता है।', '💡 🎯 📝'),
    _sc('bear', 'Then keep going: ask for a twist, a shorter version or a bolder tone. You pick the winner.', 'Continuez ensuite : demandez un détour, une version plus courte ou un ton plus audacieux. C’est vous qui choisissez.', 'Luego sigue: pide un giro, una versión más corta o un tono más atrevido. Tú eliges al ganador.', 'फिर आगे बढ़ते रहिए: नया मोड़, छोटा रूप या ज़्यादा बोल्ड लहजा माँगिए। विजेता आप चुनते हैं।', '🔁 ✨ 🏆'),
  ];
  INTROS['cr-writing'] = [
    _sc('bunny', 'I love writing, but I do not want AI to make my posts sound like everyone else’s.', 'J’adore écrire, mais je ne veux pas que l’IA fasse sonner mes publications comme celles de tout le monde.', 'Me encanta escribir, pero no quiero que la IA haga que mis publicaciones suenen como las de todos.', 'मुझे लिखना पसंद है, पर मैं नहीं चाहती कि AI मेरी पोस्ट को सबकी पोस्ट जैसा बना दे।', '🐰 ✍️ 😟'),
    _sc('bear', 'Write the draft yourself first. Then ask AI to fix typos, spot unclear parts and suggest options.', 'Écrivez d’abord le brouillon vous-même. Demandez ensuite à l’IA de corriger les fautes, repérer les passages flous et proposer des options.', 'Escribe tú primero el borrador. Luego pide a la IA que corrija errores, detecte partes poco claras y sugiera opciones.', 'पहले ड्राफ़्ट खुद लिखिए। फिर AI से गलतियाँ ठीक करने, अस्पष्ट हिस्से पकड़ने और विकल्प सुझाने को कहिए।', '📝 🔍 👍'),
    _sc('bear', 'A short style guide, like friendly and short sentences, keeps the voice yours every time.', 'Un court guide de style, comme amical et phrases courtes, garde la voix la vôtre à chaque fois.', 'Una guía de estilo corta, como amistoso y frases cortas, mantiene la voz tuya cada vez.', 'छोटी-सी स्टाइल गाइड, जैसे दोस्ताना और छोटे वाक्य, हर बार आवाज़ को आपकी ही रखती है।', '🎙️ 📋 💛'),
  ];
  INTROS['cr-visual'] = [
    _sc('bunny', 'I typed "a cute fox" and the picture was meh. How do I get what I imagine?', 'J’ai écrit « un joli renard » et l’image était bof. Comment obtenir ce que j’imagine ?', 'Escribí «un zorro lindo» y la imagen quedó regular. ¿Cómo consigo lo que imagino?', 'मैंने "एक प्यारी लोमड़ी" लिखा और तस्वीर फीकी निकली। जो मैं सोचती हूँ वह कैसे पाऊँ?', '🐰 🦊 🤔'),
    _sc('bear', 'Describe the subject, style, lighting, composition and colors. You can also say what to leave out.', 'Décrivez le sujet, le style, l’éclairage, la composition et les couleurs. Vous pouvez aussi dire ce qu’il faut exclure.', 'Describe el sujeto, el estilo, la luz, la composición y los colores. También puedes decir qué dejar fuera.', 'विषय, शैली, रोशनी, संयोजन और रंग बताइए। यह भी बता सकती हैं कि क्या नहीं चाहिए।', '🎨 💡 🖼️'),
    _sc('bear', 'Then change one thing at a time. And add alt text so people using screen readers can enjoy your image too.', 'Changez ensuite une chose à la fois. Et ajoutez un texte alternatif pour que les personnes qui utilisent un lecteur d’écran profitent aussi de votre image.', 'Luego cambia una cosa a la vez. Y añade texto alternativo para que quienes usan lectores de pantalla también disfruten tu imagen.', 'फिर एक बार में एक चीज़ बदलिए। और ऑल्ट टेक्स्ट जोड़िए ताकि स्क्रीन रीडर इस्तेमाल करने वाले लोग भी आपकी तस्वीर का आनंद ले सकें।', '🔧 ♿ 💬'),
  ];
  INTROS['cr-video-audio'] = [
    _sc('bunny', 'I want to make short videos, but scripts, captions and music feel like too much work!', 'Je veux faire de courtes vidéos, mais les scripts, les sous-titres et la musique, c’est trop de travail !', '¡Quiero hacer videos cortos, pero los guiones, los subtítulos y la música son demasiado trabajo!', 'मैं छोटे वीडियो बनाना चाहती हूँ, पर स्क्रिप्ट, कैप्शन और संगीत बहुत मेहनत लगते हैं!', '🐰 🎬 😅'),
    _sc('bear', 'AI can draft a script, plan the shots in a storyboard, suggest captions and help with voiceover or music tools.', 'L’IA peut rédiger un script, planifier les plans dans un storyboard, proposer des sous-titres et aider avec les outils de voix off ou de musique.', 'La IA puede redactar un guion, planear las tomas en un storyboard, sugerir subtítulos y ayudar con herramientas de locución o música.', 'AI स्क्रिप्ट का मसौदा बना सकता है, स्टोरीबोर्ड में शॉट्स की योजना बना सकता है, कैप्शन सुझा सकता है और वॉइसओवर या संगीत टूल में मदद कर सकता है।', '📜 🎞️ 🎵'),
    _sc('bear', 'One idea can become many things: a post, a carousel, short clips and a checklist. Check that tools allow your use.', 'Une idée peut devenir plusieurs choses : un article, un carrousel, de courts extraits et une liste de contrôle. Vérifiez que les outils autorisent votre usage.', 'Una idea puede convertirse en muchas cosas: una entrada, un carrusel, clips cortos y una lista. Comprueba que las herramientas permitan tu uso.', 'एक आइडिया कई चीज़ें बन सकता है: पोस्ट, कैरोसेल, छोटे क्लिप और चेकलिस्ट। जाँच लें कि टूल आपके उपयोग की अनुमति देते हैं।', '♻️ 📱 ✅'),
  ];
  INTROS['cr-ethics'] = [
    _sc('bunny', 'Bruno, is it okay to share things I make with AI? I do not want to hurt anyone.', 'Bruno, c’est correct de partager ce que je crée avec l’IA ? Je ne veux faire de mal à personne.', 'Bruno, ¿está bien compartir lo que hago con IA? No quiero hacerle daño a nadie.', 'ब्रूनो, क्या AI से बनाई चीज़ें साझा करना ठीक है? मैं किसी को चोट नहीं पहुँचाना चाहती।', '🐰 💭 🤝'),
    _sc('bear', 'Yes, with care. Do not copy a living artist’s style to pass it off as theirs, and never use a real person’s face or voice without consent.', 'Oui, avec soin. Ne copiez pas le style d’un artiste vivant pour le faire passer pour le sien, et n’utilisez jamais le visage ou la voix d’une personne sans son accord.', 'Sí, con cuidado. No copies el estilo de un artista vivo para hacerlo pasar por suyo, y nunca uses la cara o la voz de una persona sin su consentimiento.', 'हाँ, सावधानी से। किसी जीवित कलाकार की शैली की नकल करके उसे उसका काम बताकर न चलाएँ, और किसी असली व्यक्ति का चेहरा या आवाज़ सहमति के बिना कभी इस्तेमाल न करें।', '🚫 🎭 🙅'),
    _sc('bear', 'Say when AI helped, read each platform’s rules and check facts. Copyright rules differ by country, so this is not legal advice.', 'Dites quand l’IA a aidé, lisez les règles de chaque plateforme et vérifiez les faits. Le droit d’auteur varie selon les pays, ce n’est donc pas un avis juridique.', 'Di cuándo ayudó la IA, lee las reglas de cada plataforma y comprueba los datos. Los derechos de autor cambian según el país, así que esto no es asesoría legal.', 'बताइए कि AI ने कब मदद की, हर प्लेटफ़ॉर्म के नियम पढ़िए और तथ्य जाँचिए। कॉपीराइट के नियम देश-देश में अलग हैं, इसलिए यह कानूनी सलाह नहीं है।', '📢 📖 ✅'),
  ];

  SUMMARIES['cr-ideas'] = [
    ['Give AI your topic, audience, number of ideas and tone to get a useful list.', 'Donnez à l’IA votre sujet, votre public, le nombre d’idées et le ton pour obtenir une liste utile.', 'Dale a la IA tu tema, público, número de ideas y tono para obtener una lista útil.', 'उपयोगी सूची पाने के लिए AI को अपना विषय, दर्शक, आइडिया की संख्या और लहजा बताएँ।'],
    ['Ask for many ideas, pick favourites, then ask AI to expand or twist them.', 'Demandez beaucoup d’idées, choisissez vos favorites, puis demandez à l’IA de les développer ou de les détourner.', 'Pide muchas ideas, elige tus favoritas y luego pide a la IA que las amplíe o cambie.', 'कई आइडिया माँगें, पसंदीदा चुनें, फिर AI से उन्हें बढ़ाने या नया मोड़ देने को कहें।'],
    ['Do not stop at the first answer. Iterate, and make the final choice yourself.', 'Ne vous arrêtez pas à la première réponse. Itérez, et faites le choix final vous-même.', 'No te quedes con la primera respuesta. Itera y toma tú la decisión final.', 'पहले जवाब पर न रुकें। बार-बार सुधारें, और अंतिम फ़ैसला खुद लें।'],
  ];
  SUMMARIES['cr-writing'] = [
    ['Write your own draft first, then use AI to edit, outline or suggest options.', 'Écrivez d’abord votre brouillon, puis utilisez l’IA pour réviser, structurer ou proposer des options.', 'Escribe primero tu borrador y luego usa la IA para editar, esquematizar o sugerir opciones.', 'पहले अपना ड्राफ़्ट खुद लिखें, फिर संपादन, रूपरेखा या विकल्पों के लिए AI का उपयोग करें।'],
    ['Tell AI what to keep and what to fix, and ask to see the changes.', 'Dites à l’IA ce qu’il faut garder et corriger, et demandez de voir les changements.', 'Dile a la IA qué conservar y qué corregir, y pide ver los cambios.', 'AI को बताएँ कि क्या रखना है और क्या सुधारना है, और बदलाव दिखाने को कहें।'],
    ['A short style guide pasted into prompts keeps your voice steady.', 'Un court guide de style collé dans vos prompts garde votre voix stable.', 'Una guía de estilo corta pegada en tus prompts mantiene tu voz constante.', 'प्रॉम्प्ट में चिपकाई गई छोटी स्टाइल गाइड आपकी आवाज़ को एक-सी रखती है।'],
  ];
  SUMMARIES['cr-visual'] = [
    ['Name the subject, style, lighting, composition and colors in an image prompt.', 'Nommez le sujet, le style, l’éclairage, la composition et les couleurs dans un prompt d’image.', 'Nombra el sujeto, estilo, luz, composición y colores en un prompt de imagen.', 'इमेज प्रॉम्प्ट में विषय, शैली, रोशनी, संयोजन और रंग बताएँ।'],
    ['Say what to leave out, and change one thing at a time when you iterate.', 'Dites ce qu’il faut exclure, et changez une chose à la fois quand vous itérez.', 'Di qué dejar fuera y cambia una cosa a la vez al iterar.', 'बताएँ कि क्या नहीं चाहिए, और सुधारते समय एक बार में एक चीज़ बदलें।'],
    ['Write alt text for your images so everyone can understand them.', 'Rédigez un texte alternatif pour vos images afin que tout le monde puisse les comprendre.', 'Escribe texto alternativo para tus imágenes para que todos puedan entenderlas.', 'अपनी तस्वीरों के लिए ऑल्ट टेक्स्ट लिखें ताकि हर कोई उन्हें समझ सके।'],
  ];
  SUMMARIES['cr-video-audio'] = [
    ['Ask for scripts with a length, audience, structure and format, like two columns.', 'Demandez des scripts avec une durée, un public, une structure et un format, comme deux colonnes.', 'Pide guiones con duración, público, estructura y formato, como dos columnas.', 'स्क्रिप्ट माँगते समय अवधि, दर्शक, ढाँचा और फ़ॉर्मैट बताएँ, जैसे दो कॉलम।'],
    ['Work in order: script, storyboard, record and edit, then captions.', 'Travaillez dans l’ordre : script, storyboard, tournage et montage, puis sous-titres.', 'Trabaja en orden: guion, storyboard, grabación y edición, y luego subtítulos.', 'क्रम से काम करें: स्क्रिप्ट, स्टोरीबोर्ड, रिकॉर्डिंग और एडिटिंग, फिर कैप्शन।'],
    ['Repurpose one idea into many formats, and check each tool’s terms of use.', 'Réutilisez une idée sous plusieurs formats, et vérifiez les conditions d’utilisation de chaque outil.', 'Reutiliza una idea en muchos formatos y revisa los términos de uso de cada herramienta.', 'एक आइडिया को कई फ़ॉर्मैट में दोबारा इस्तेमाल करें, और हर टूल की उपयोग-शर्तें जाँचें।'],
  ];
  SUMMARIES['cr-ethics'] = [
    ['Do not copy a living artist’s style to pass it off as theirs, and be open when AI helped.', 'Ne copiez pas le style d’un artiste vivant pour le faire passer pour le sien, et soyez transparent quand l’IA a aidé.', 'No copies el estilo de un artista vivo para hacerlo pasar por suyo y sé transparente cuando la IA ayudó.', 'किसी जीवित कलाकार की शैली की नकल करके उसे उसका काम न बताएँ, और AI की मदद हो तो खुलकर बताएँ।'],
    ['Never make deepfakes or use a real person’s face or voice without their consent.', 'Ne créez jamais de deepfakes et n’utilisez jamais le visage ou la voix d’une personne sans son accord.', 'Nunca hagas deepfakes ni uses la cara o la voz de una persona sin su consentimiento.', 'कभी डीपफ़ेक न बनाएँ और किसी का चेहरा या आवाज़ उसकी सहमति के बिना इस्तेमाल न करें।'],
    ['Check facts, read platform rules and add your own originality. Laws differ by country.', 'Vérifiez les faits, lisez les règles des plateformes et ajoutez votre originalité. Les lois varient selon les pays.', 'Comprueba los datos, lee las reglas de las plataformas y añade tu originalidad. Las leyes cambian según el país.', 'तथ्य जाँचें, प्लेटफ़ॉर्म के नियम पढ़ें और अपनी मौलिकता जोड़ें। कानून हर देश में अलग हैं।'],
  ];
})();
