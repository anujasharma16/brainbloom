/* "AI for Business" path: practical, safe use of AI at work (writing, data, customers, process, governance).
   Loaded after trading.js (uses T4, mc, tf, match, order, _sc, INTROS, SUMMARIES, PATHS). */

const BUSINESS = {
  id: 'business', icon: '📊',
  title: T4('AI for Business', 'L’IA au travail', 'IA para los negocios', 'बिज़नेस के लिए AI'),
  desc: T4('Use AI at work: write faster, understand data, serve customers, improve processes, and stay safe.',
    'Utilisez l’IA au travail : écrivez plus vite, comprenez vos données, servez vos clients, améliorez vos processus et restez en sécurité.',
    'Usa la IA en el trabajo: escribe más rápido, entiende tus datos, atiende a clientes, mejora procesos y mantente seguro.',
    'काम में AI इस्तेमाल करें: तेज़ लिखें, डेटा समझें, ग्राहकों की सेवा करें, प्रक्रियाएँ सुधारें और सुरक्षित रहें।'),
  badge: { icon: '📊', title: T4('Business Booster', 'Booster d’affaires', 'Impulsor de negocios', 'बिज़नेस बूस्टर'),
    desc: T4('Finish the AI for Business path', 'Terminez le parcours L’IA au travail', 'Termina el camino IA para los negocios', 'बिज़नेस के लिए AI पथ पूरा करें') },
  lessons: [
    {
      id: 'bz-writing', icon: '✉️',
      title: T4('Writing at work: emails, reports, notes', 'Écrire au travail : courriels, rapports, notes', 'Escribir en el trabajo: correos, informes, notas', 'काम में लेखन: ईमेल, रिपोर्ट, नोट्स'),
      questions: [
        mc(T4('Which prompt will get the best email to a client about a late order?', 'Quel prompt donnera le meilleur courriel à un client au sujet d’une commande en retard ?', '¿Qué prompt dará el mejor correo a un cliente por un pedido retrasado?', 'देरी से आए ऑर्डर के बारे में ग्राहक को सबसे अच्छा ईमेल कौन-सा प्रॉम्प्ट दिलाएगा?'),
          T4(['Write an email.', 'Write a client email about a delay.', 'Write a short, polite email to a client: their order will be 3 days late and now arrives Friday. Apologise once, give the new date, offer to answer questions. Warm, professional tone.', 'Make the client happy about the delay.'],
            ['Écris un courriel.', 'Écris un courriel à un client à propos d’un retard.', 'Écris un court courriel poli à un client : sa commande aura 3 jours de retard et arrivera vendredi. Excuse-toi une fois, donne la nouvelle date, propose de répondre aux questions. Ton chaleureux et professionnel.', 'Rends le client content du retard.'],
            ['Escribe un correo.', 'Escribe un correo a un cliente sobre un retraso.', 'Escribe un correo corto y cortés a un cliente: su pedido llegará con 3 días de retraso, ahora el viernes. Discúlpate una vez, da la nueva fecha y ofrece resolver dudas. Tono cálido y profesional.', 'Haz que el cliente esté feliz con el retraso.'],
            ['एक ईमेल लिखो।', 'देरी के बारे में ग्राहक को ईमेल लिखो।', 'ग्राहक को एक छोटा, विनम्र ईमेल लिखो: उनका ऑर्डर 3 दिन देर से, अब शुक्रवार को पहुँचेगा। एक बार माफ़ी माँगो, नई तारीख बताओ, सवालों के जवाब देने की पेशकश करो। गर्मजोशी भरा, पेशेवर लहजा रखो।', 'देरी को लेकर ग्राहक को खुश कर दो।']),
          2,
          T4('A good prompt gives the facts, the goal and the tone. Vague prompts give vague emails.',
            'Un bon prompt donne les faits, l’objectif et le ton. Un prompt vague donne un courriel vague.',
            'Un buen prompt da los hechos, el objetivo y el tono. Un prompt vago da un correo vago.',
            'अच्छा प्रॉम्प्ट तथ्य, लक्ष्य और लहजा बताता है। अस्पष्ट प्रॉम्प्ट से अस्पष्ट ईमेल मिलता है।')),
        tf(T4('Before you share an AI summary of a meeting, you should check names, dates and action items against your notes.', 'Avant de partager un résumé de réunion fait par l’IA, il faut vérifier les noms, les dates et les actions par rapport à vos notes.', 'Antes de compartir un resumen de reunión hecho por IA, debes comprobar nombres, fechas y tareas con tus notas.', 'AI से बना मीटिंग का सार साझा करने से पहले, आपको नाम, तारीखें और काम की सूची अपने नोट्स से जाँचनी चाहिए।'),
          true,
          T4('AI can swap names, shift dates or invent a task. You are still the author.', 'L’IA peut échanger des noms, décaler des dates ou inventer une tâche. Vous restez l’auteur.', 'La IA puede cambiar nombres, mover fechas o inventar una tarea. Tú sigues siendo el autor.', 'AI नाम बदल सकता है, तारीखें खिसका सकता है या कोई काम गढ़ सकता है। लेखक अब भी आप ही हैं।')),
        order(T4('Put the steps for turning meeting notes into an action list in order', 'Mettez dans l’ordre les étapes pour transformer des notes de réunion en liste d’actions', 'Ordena los pasos para convertir notas de reunión en una lista de tareas', 'मीटिंग नोट्स को कार्य-सूची में बदलने के चरण सही क्रम में लगाएँ'),
          T4(['Paste your rough notes (with no private data)', 'Ask for decisions and actions, each with an owner and date', 'Check the result against your notes and fix errors', 'Share it with the team'],
            ['Collez vos notes brutes (sans données privées)', 'Demandez les décisions et les actions, chacune avec un responsable et une date', 'Vérifiez le résultat avec vos notes et corrigez les erreurs', 'Partagez-le avec l’équipe'],
            ['Pega tus notas sin pulir (sin datos privados)', 'Pide las decisiones y tareas, cada una con responsable y fecha', 'Comprueba el resultado con tus notas y corrige errores', 'Compártelo con el equipo'],
            ['अपने कच्चे नोट्स पेस्ट करें (निजी डेटा के बिना)', 'फ़ैसले और काम माँगें, हर एक के साथ ज़िम्मेदार व्यक्ति और तारीख', 'नतीजे को अपने नोट्स से जाँचें और गलतियाँ सुधारें', 'उसे टीम के साथ साझा करें'])),
      ],
    },
    {
      id: 'bz-data', icon: '📈',
      title: T4('Understanding data and survey comments', 'Comprendre les données et les commentaires de sondage', 'Entender datos y comentarios de encuestas', 'डेटा और सर्वे की टिप्पणियाँ समझना'),
      questions: [
        mc(T4('Which prompt is best for making sense of 200 customer survey comments?', 'Quel prompt convient le mieux pour analyser 200 commentaires de sondage client ?', '¿Qué prompt es mejor para entender 200 comentarios de una encuesta de clientes?', '200 ग्राहक सर्वे टिप्पणियों को समझने के लिए सबसे अच्छा प्रॉम्प्ट कौन-सा है?'),
          T4(['What do customers think?', 'Group the comments below into 5 themes. For each theme give a count, one short quote and a suggested follow-up. Say if a theme has very few comments. [paste comments]', 'Tell me the one thing customers want.', 'Summarize everything in one word.'],
            ['Que pensent les clients ?', 'Regroupe les commentaires ci-dessous en 5 thèmes. Pour chaque thème, donne un nombre, une courte citation et une suite à donner. Indique si un thème compte très peu de commentaires. [coller les commentaires]', 'Dis-moi la seule chose que veulent les clients.', 'Résume tout en un mot.'],
            ['¿Qué piensan los clientes?', 'Agrupa los comentarios de abajo en 5 temas. Para cada tema da un conteo, una cita corta y un seguimiento sugerido. Avisa si un tema tiene muy pocos comentarios. [pegar comentarios]', 'Dime lo único que quieren los clientes.', 'Resume todo en una palabra.'],
            ['ग्राहक क्या सोचते हैं?', 'नीचे की टिप्पणियों को 5 विषयों में बाँटो। हर विषय के लिए गिनती, एक छोटा उद्धरण और सुझाई गई अगली कार्रवाई दो। बताओ अगर किसी विषय पर बहुत कम टिप्पणियाँ हैं। [टिप्पणियाँ पेस्ट करें]', 'मुझे बताओ ग्राहक सिर्फ़ एक चीज़ क्या चाहते हैं।', 'सब कुछ एक शब्द में बताओ।']),
          1,
          T4('Ask for a clear structure and evidence (counts and quotes) so you can check the answer.',
            'Demandez une structure claire et des preuves (nombres et citations) pour pouvoir vérifier la réponse.',
            'Pide una estructura clara y pruebas (conteos y citas) para poder comprobar la respuesta.',
            'साफ़ ढाँचा और सबूत (गिनती और उद्धरण) माँगें ताकि आप जवाब जाँच सकें।')),
        match(T4('Match each data job with the best way to use AI', 'Associez chaque tâche de données à la meilleure façon d’utiliser l’IA', 'Relaciona cada tarea de datos con la mejor forma de usar la IA', 'डेटा के हर काम को AI के सबसे अच्छे उपयोग से मिलाएँ'),
          T4([['Messy comments', 'Group them into themes'], ['A formula you cannot write', 'Ask AI to write it, then test it on a few rows'], ['A surprising total', 'Recalculate it yourself'], ['A chart for the boss', 'Ask AI to suggest chart types, then check the axes and labels']],
            [['Commentaires en vrac', 'Les regrouper par thèmes'], ['Une formule que vous ne savez pas écrire', 'Demander à l’IA de l’écrire, puis la tester sur quelques lignes'], ['Un total surprenant', 'Le recalculer vous-même'], ['Un graphique pour la direction', 'Demander des types de graphiques à l’IA, puis vérifier les axes et les titres']],
            [['Comentarios desordenados', 'Agruparlos en temas'], ['Una fórmula que no sabes escribir', 'Pedirle a la IA que la escriba y probarla con unas filas'], ['Un total sorprendente', 'Recalcularlo tú mismo'], ['Un gráfico para el jefe', 'Pedir tipos de gráfico a la IA y revisar ejes y etiquetas']],
            [['बिखरी हुई टिप्पणियाँ', 'उन्हें विषयों में बाँटना'], ['ऐसा फ़ॉर्मूला जो आप नहीं लिख पाते', 'AI से लिखवाएँ, फिर कुछ पंक्तियों पर परखें'], ['चौंकाने वाला कुल योग', 'उसे खुद दोबारा जोड़ें'], ['बॉस के लिए चार्ट', 'AI से चार्ट के प्रकार पूछें, फिर अक्ष और लेबल जाँचें']])),
        tf(T4('If AI gives you a total from your spreadsheet, you can skip checking it because computers never make maths mistakes.', 'Si l’IA vous donne un total tiré de votre tableur, vous pouvez ne pas le vérifier, car les ordinateurs ne se trompent jamais en calcul.', 'Si la IA te da un total de tu hoja de cálculo, puedes no revisarlo porque las computadoras nunca fallan en matemáticas.', 'अगर AI आपकी स्प्रेडशीट से कोई कुल योग बताए, तो उसे जाँचना ज़रूरी नहीं, क्योंकि कंप्यूटर गणित में कभी गलती नहीं करते।'),
          false,
          T4('AI can misread columns or guess numbers. Spot-check totals with a formula or a calculator.',
            'L’IA peut mal lire des colonnes ou deviner des chiffres. Vérifiez les totaux avec une formule ou une calculatrice.',
            'La IA puede leer mal columnas o inventar cifras. Comprueba los totales con una fórmula o una calculadora.',
            'AI कॉलम गलत पढ़ सकता है या आँकड़े अंदाज़े से बता सकता है। कुल योग फ़ॉर्मूले या कैलकुलेटर से जाँचें।')),
      ],
    },
    {
      id: 'bz-customers', icon: '🤝',
      title: T4('Customers, marketing and brand voice', 'Clients, marketing et ton de marque', 'Clientes, marketing y voz de marca', 'ग्राहक, मार्केटिंग और ब्रांड की आवाज़'),
      questions: [
        mc(T4('Which prompt best drafts a reply to an unhappy customer?', 'Quel prompt rédige le mieux une réponse à un client mécontent ?', '¿Qué prompt redacta mejor una respuesta a un cliente molesto?', 'नाराज़ ग्राहक को जवाब का मसौदा बनाने के लिए सबसे अच्छा प्रॉम्प्ट कौन-सा है?'),
          T4(['Reply to this angry customer.', 'Draft a calm reply under 120 words to the message below. Thank them, say sorry for the problem, offer a replacement or refund, and give the support email. Do not promise anything else. [paste message]', 'Tell this customer they are wrong.', 'Write something to calm them down no matter what.'],
            ['Réponds à ce client en colère.', 'Rédige une réponse calme de moins de 120 mots au message ci-dessous. Remercie, excuse-toi pour le problème, propose un remplacement ou un remboursement et donne le courriel du soutien. Ne promets rien d’autre. [coller le message]', 'Dis à ce client qu’il a tort.', 'Écris n’importe quoi pour le calmer.'],
            ['Responde a este cliente enojado.', 'Redacta una respuesta tranquila de menos de 120 palabras al mensaje de abajo. Agradece, pide perdón por el problema, ofrece un reemplazo o reembolso y da el correo de soporte. No prometas nada más. [pegar mensaje]', 'Dile a este cliente que se equivoca.', 'Escribe lo que sea para calmarlo.'],
            ['इस गुस्साए ग्राहक को जवाब दो।', 'नीचे के संदेश का 120 शब्दों से कम में शांत जवाब बनाओ। धन्यवाद दो, समस्या के लिए खेद जताओ, बदलाव या रिफ़ंड का प्रस्ताव दो और सहायता का ईमेल दो। और कोई वादा मत करो। [संदेश पेस्ट करें]', 'इस ग्राहक को बताओ कि वह गलत है।', 'कुछ भी लिखकर इन्हें शांत कर दो।']),
          1,
          T4('Give limits and what you can offer. Then a human reads the draft before it is sent.',
            'Donnez des limites et ce que vous pouvez offrir. Ensuite, une personne relit le brouillon avant l’envoi.',
            'Da límites y lo que puedes ofrecer. Luego una persona lee el borrador antes de enviarlo.',
            'सीमाएँ और जो आप दे सकते हैं, बताएँ। फिर भेजने से पहले कोई इंसान मसौदा पढ़े।')),
        mc(T4('How do you get marketing copy that sounds like your brand?', 'Comment obtenir un texte marketing qui sonne comme votre marque ?', '¿Cómo logras un texto de marketing que suene como tu marca?', 'मार्केटिंग का ऐसा टेक्स्ट कैसे पाएँ जो आपके ब्रांड जैसा लगे?'),
          T4(['Write a post for our coffee shop. Voice: friendly and playful, short sentences, no slang, never pushy. Here are 2 of our old posts as examples: [paste]. Topic: new autumn latte. Under 60 words.', 'Write an ad.', 'Write the best ad ever.', 'Copy a famous brand’s style exactly.'],
            ['Écris une publication pour notre café. Ton : amical et enjoué, phrases courtes, pas d’argot, jamais insistant. Voici 2 de nos anciennes publications en exemple : [coller]. Sujet : le nouveau latte d’automne. Moins de 60 mots.', 'Écris une pub.', 'Écris la meilleure pub de tous les temps.', 'Copie exactement le style d’une grande marque.'],
            ['Escribe una publicación para nuestra cafetería. Voz: amable y juguetona, frases cortas, sin jerga, nunca insistente. Aquí tienes 2 publicaciones antiguas como ejemplo: [pegar]. Tema: el nuevo latte de otoño. Menos de 60 palabras.', 'Escribe un anuncio.', 'Escribe el mejor anuncio de la historia.', 'Copia exactamente el estilo de una marca famosa.'],
            ['हमारे कैफ़े के लिए एक पोस्ट लिखो। आवाज़: मिलनसार और चुलबुली, छोटे वाक्य, अपशब्द नहीं, कभी ज़ोर-ज़बरदस्ती नहीं। उदाहरण के लिए हमारी 2 पुरानी पोस्ट ये हैं: [पेस्ट करें]। विषय: पतझड़ का नया लाटे। 60 शब्दों से कम।', 'एक विज्ञापन लिखो।', 'अब तक का सबसे अच्छा विज्ञापन लिखो।', 'किसी मशहूर ब्रांड की शैली हू-ब-हू नकल करो।']),
          0,
          T4('Describe your voice and show real examples. The AI then copies your style, not a stranger’s.',
            'Décrivez votre ton et montrez de vrais exemples. L’IA imite alors votre style, pas celui d’un autre.',
            'Describe tu voz y muestra ejemplos reales. Así la IA copia tu estilo, no el de otro.',
            'अपनी आवाज़ बताएँ और असली उदाहरण दिखाएँ। तब AI आपकी शैली अपनाएगा, किसी और की नहीं।')),
        match(T4('Match each customer task with a safe way to use AI', 'Associez chaque tâche client à une façon sûre d’utiliser l’IA', 'Relaciona cada tarea con clientes con una forma segura de usar la IA', 'ग्राहकों के हर काम को AI के सुरक्षित उपयोग से मिलाएँ'),
          T4([['Support replies', 'AI drafts, a person reviews and sends'], ['Product descriptions', 'AI writes options, you check every fact'], ['Personalised emails', 'Use only data the customer agreed to share'], ['Chatbot on your website', 'Tell users it is AI and give an easy way to reach a person']],
            [['Réponses au soutien', 'L’IA rédige, une personne relit et envoie'], ['Descriptions de produits', 'L’IA propose des versions, vous vérifiez chaque fait'], ['Courriels personnalisés', 'Utilisez seulement les données que le client a accepté de partager'], ['Robot conversationnel sur votre site', 'Indiquez que c’est une IA et offrez un moyen simple de joindre une personne']],
            [['Respuestas de soporte', 'La IA redacta, una persona revisa y envía'], ['Descripciones de producto', 'La IA propone opciones, tú compruebas cada dato'], ['Correos personalizados', 'Usa solo datos que el cliente aceptó compartir'], ['Chatbot en tu sitio web', 'Avisa que es una IA y da una forma fácil de hablar con una persona']],
            [['सहायता के जवाब', 'AI मसौदा बनाता है, इंसान पढ़कर भेजता है'], ['उत्पाद के विवरण', 'AI विकल्प लिखता है, आप हर तथ्य जाँचते हैं'], ['व्यक्तिगत ईमेल', 'केवल वही डेटा इस्तेमाल करें जिसे साझा करने की ग्राहक ने सहमति दी हो'], ['वेबसाइट पर चैटबॉट', 'बताएँ कि यह AI है और इंसान तक पहुँचने का आसान रास्ता दें']])),
      ],
    },
    {
      id: 'bz-process', icon: '⚙️',
      title: T4('Spotting tasks to automate', 'Repérer les tâches à automatiser', 'Detectar tareas para automatizar', 'ऑटोमेट करने लायक काम पहचानना'),
      questions: [
        mc(T4('Which task is the best first candidate for AI help?', 'Quelle tâche est la meilleure candidate pour une première aide de l’IA ?', '¿Qué tarea es la mejor candidata para empezar con ayuda de la IA?', 'AI की मदद के लिए पहला सबसे अच्छा काम कौन-सा है?'),
          T4(['Firing a team member', 'Sorting 500 routine support emails by topic each week', 'Deciding next year’s company strategy alone', 'Handling a serious complaint with no human'],
            ['Congédier un membre de l’équipe', 'Trier chaque semaine 500 courriels de soutien courants par sujet', 'Décider seul de la stratégie de l’an prochain', 'Traiter une plainte grave sans aucune personne'],
            ['Despedir a un miembro del equipo', 'Clasificar cada semana 500 correos de soporte rutinarios por tema', 'Decidir sola la estrategia del próximo año', 'Gestionar una queja grave sin ninguna persona'],
            ['टीम के किसी सदस्य को निकालना', 'हर हफ़्ते 500 नियमित सहायता ईमेल विषय के अनुसार छाँटना', 'अगले साल की कंपनी रणनीति अकेले तय करना', 'किसी गंभीर शिकायत को बिना इंसान के निपटाना']),
          1,
          T4('Start with repetitive, low-risk tasks with clear rules. Keep people for serious or sensitive decisions.',
            'Commencez par des tâches répétitives, peu risquées et aux règles claires. Gardez les personnes pour les décisions graves ou sensibles.',
            'Empieza con tareas repetitivas, de bajo riesgo y con reglas claras. Deja a las personas las decisiones graves o delicadas.',
            'दोहराए जाने वाले, कम जोखिम और साफ़ नियमों वाले कामों से शुरू करें। गंभीर या संवेदनशील फ़ैसले इंसानों पर छोड़ें।')),
        order(T4('Put the steps of a good AI pilot in order', 'Mettez dans l’ordre les étapes d’un bon projet pilote d’IA', 'Ordena los pasos de un buen piloto de IA', 'एक अच्छे AI पायलट के चरण सही क्रम में लगाएँ'),
          T4(['Pick one small task and measure how long it takes now', 'Try AI on it with a few people for a few weeks', 'Compare time saved, quality and mistakes with the starting numbers', 'Expand to more teams if it clearly works'],
            ['Choisir une petite tâche et mesurer le temps qu’elle prend aujourd’hui', 'Essayer l’IA avec quelques personnes pendant quelques semaines', 'Comparer le temps gagné, la qualité et les erreurs avec les chiffres de départ', 'Étendre à d’autres équipes si cela fonctionne clairement'],
            ['Elegir una tarea pequeña y medir cuánto tarda ahora', 'Probar la IA en ella con unas pocas personas durante unas semanas', 'Comparar el tiempo ahorrado, la calidad y los errores con las cifras iniciales', 'Ampliar a más equipos si funciona claramente'],
            ['एक छोटा काम चुनें और नापें कि अभी उसमें कितना समय लगता है', 'कुछ लोगों के साथ कुछ हफ़्ते उस पर AI आज़माएँ', 'बचे समय, गुणवत्ता और गलतियों की तुलना शुरुआती आँकड़ों से करें', 'अगर साफ़ तौर पर काम करे तो और टीमों तक फैलाएँ'])),
        tf(T4('To judge the return on an AI tool, count only the subscription price and ignore review time and training.', 'Pour juger le rendement d’un outil d’IA, il suffit de compter le prix de l’abonnement et d’ignorer le temps de relecture et la formation.', 'Para juzgar el retorno de una herramienta de IA, basta contar el precio de la suscripción e ignorar el tiempo de revisión y la formación.', 'AI टूल का फ़ायदा आँकने के लिए बस सब्सक्रिप्शन की कीमत गिनें, और समीक्षा का समय व ट्रेनिंग को अनदेखा करें।'),
          false,
          T4('Count all costs (tool, review time, training) against the time and money saved.',
            'Comptez tous les coûts (outil, temps de relecture, formation) par rapport au temps et à l’argent économisés.',
            'Cuenta todos los costos (herramienta, tiempo de revisión, formación) frente al tiempo y dinero ahorrados.',
            'सभी खर्च (टूल, समीक्षा का समय, ट्रेनिंग) को बचे समय और पैसे के सामने गिनें।')),
      ],
    },
    {
      id: 'bz-governance', icon: '🛡️',
      title: T4('Using AI responsibly at work', 'Utiliser l’IA de façon responsable au travail', 'Usar la IA con responsabilidad en el trabajo', 'काम में AI का ज़िम्मेदार उपयोग'),
      questions: [
        mc(T4('You want AI to summarize a customer complaint that includes a name and phone number. Which prompt is safest?', 'Vous voulez que l’IA résume une plainte contenant un nom et un numéro de téléphone. Quel prompt est le plus sûr ?', 'Quieres que la IA resuma una queja que incluye un nombre y un teléfono. ¿Qué prompt es el más seguro?', 'आप चाहते हैं कि AI एक शिकायत का सार बनाए जिसमें नाम और फ़ोन नंबर है। सबसे सुरक्षित प्रॉम्प्ट कौन-सा है?'),
          T4(['Summarize this complaint: [paste full message with name and phone number]', 'Summarize this complaint in 3 bullets. [paste message with name and phone number replaced by “Customer A” and “[phone]”]', 'Summarize this complaint and also find the customer’s home address online.', 'Summarize this complaint. I will paste it into any free AI tool I find.'],
            ['Résume cette plainte : [coller le message complet avec le nom et le numéro]', 'Résume cette plainte en 3 puces. [coller le message où le nom et le numéro sont remplacés par « Client A » et « [téléphone] »]', 'Résume cette plainte et trouve aussi l’adresse du client en ligne.', 'Résume cette plainte. Je la collerai dans n’importe quel outil d’IA gratuit.'],
            ['Resume esta queja: [pegar el mensaje completo con nombre y teléfono]', 'Resume esta queja en 3 viñetas. [pegar el mensaje con el nombre y el teléfono reemplazados por «Cliente A» y «[teléfono]»]', 'Resume esta queja y busca también la dirección del cliente en línea.', 'Resume esta queja. La pegaré en cualquier herramienta de IA gratuita que encuentre.'],
            ['इस शिकायत का सार दो: [नाम और फ़ोन नंबर के साथ पूरा संदेश पेस्ट करें]', 'इस शिकायत का 3 बिंदुओं में सार दो। [ऐसा संदेश पेस्ट करें जिसमें नाम और नंबर की जगह "ग्राहक A" और "[फ़ोन]" लिखा हो]', 'इस शिकायत का सार दो और ग्राहक का घर का पता भी ऑनलाइन खोजो।', 'इस शिकायत का सार दो। मैं इसे कोई भी मुफ़्त AI टूल मिलने पर उसमें पेस्ट कर दूँगा।']),
          1,
          T4('Remove personal details before you paste, and only use tools your company approves.',
            'Retirez les données personnelles avant de coller, et n’utilisez que les outils approuvés par votre entreprise.',
            'Quita los datos personales antes de pegar y usa solo herramientas aprobadas por tu empresa.',
            'पेस्ट करने से पहले निजी जानकारी हटाएँ, और केवल वही टूल इस्तेमाल करें जो आपकी कंपनी ने मंज़ूर किए हों।')),
        match(T4('Match each risk with the right safeguard', 'Associez chaque risque à la bonne protection', 'Relaciona cada riesgo con la protección correcta', 'हर जोखिम को सही सुरक्षा उपाय से मिलाएँ'),
          T4([['Confidential data leaks', 'Never paste secrets; use approved tools'], ['Biased results in hiring', 'Have a person review decisions and test for fairness'], ['Made-up facts', 'Check key claims against trusted sources'], ['Unclear responsibility', 'A named person signs off before anything is sent']],
            [['Fuite de données confidentielles', 'Ne collez jamais de secrets ; utilisez des outils approuvés'], ['Résultats biaisés en recrutement', 'Faites examiner les décisions par une personne et testez l’équité'], ['Faits inventés', 'Vérifiez les affirmations clés auprès de sources fiables'], ['Responsabilité floue', 'Une personne désignée valide avant tout envoi']],
            [['Filtración de datos confidenciales', 'Nunca pegues secretos; usa herramientas aprobadas'], ['Resultados sesgados en contratación', 'Que una persona revise las decisiones y se pruebe la equidad'], ['Datos inventados', 'Comprueba las afirmaciones clave con fuentes fiables'], ['Responsabilidad poco clara', 'Una persona designada da el visto bueno antes de enviar nada']],
            [['गोपनीय डेटा का लीक होना', 'राज़ कभी पेस्ट न करें; मंज़ूर टूल इस्तेमाल करें'], ['भर्ती में पक्षपाती नतीजे', 'फ़ैसलों की समीक्षा इंसान करे और निष्पक्षता की जाँच हो'], ['गढ़े हुए तथ्य', 'मुख्य दावों को भरोसेमंद स्रोतों से जाँचें'], ['ज़िम्मेदारी साफ़ न होना', 'कुछ भी भेजने से पहले एक तय व्यक्ति मंज़ूरी दे']])),
        tf(T4('If your company has an AI policy, you should follow it and tell people when AI helped create work that matters to them.', 'Si votre entreprise a une politique sur l’IA, il faut la suivre et dire aux gens quand l’IA a aidé à créer un travail qui les concerne.', 'Si tu empresa tiene una política de IA, debes seguirla y avisar a las personas cuando la IA ayudó a crear un trabajo que les importa.', 'अगर आपकी कंपनी की AI नीति है, तो उसका पालन करें और जिन लोगों के लिए काम मायने रखता है उन्हें बताएँ कि उसमें AI ने मदद की।'),
          true,
          T4('Follow the rules and be open about AI help. It builds trust and avoids surprises.',
            'Respectez les règles et soyez transparent sur l’aide de l’IA. Cela crée la confiance et évite les mauvaises surprises.',
            'Sigue las reglas y sé transparente sobre la ayuda de la IA. Genera confianza y evita sorpresas.',
            'नियमों का पालन करें और AI की मदद के बारे में खुले रहें। इससे भरोसा बनता है और अप्रिय हैरानी नहीं होती।')),
      ],
    },
  ],
};

/* ---------- register the path, its stories and summaries ---------- */
(() => {
  PATHS.push(BUSINESS);

  INTROS['bz-writing'] = [
    _sc('bunny', 'Bruno, I spend hours writing emails and reports. Can AI help?', 'Bruno, je passe des heures à écrire des courriels et des rapports. L’IA peut aider ?', 'Bruno, paso horas escribiendo correos e informes. ¿Puede ayudar la IA?', 'ब्रूनो, मैं ईमेल और रिपोर्ट लिखने में घंटों लगाती हूँ। क्या AI मदद कर सकता है?', '✉️ ⏰ ❓'),
    _sc('bear', 'Yes! Give it the facts, your goal, the reader and the tone. It writes a first draft in seconds.', 'Oui ! Donnez-lui les faits, votre objectif, le lecteur et le ton. Elle écrit un premier jet en quelques secondes.', '¡Sí! Dale los hechos, tu objetivo, el lector y el tono. Escribe un primer borrador en segundos.', 'हाँ! उसे तथ्य, अपना लक्ष्य, पाठक और लहजा बताएँ। वह सेकंडों में पहला मसौदा लिख देता है।', '📝 🎯 👤 🎨'),
    _sc('bear', 'But it is only a draft. You check the facts, names and dates, then you press send.', 'Mais ce n’est qu’un brouillon. Vous vérifiez les faits, les noms et les dates, puis c’est vous qui envoyez.', 'Pero es solo un borrador. Tú compruebas los datos, nombres y fechas, y luego pulsas enviar.', 'पर यह सिर्फ़ मसौदा है। तथ्य, नाम और तारीखें आप जाँचें, फिर भेजें आप ही।', '✅ 📅 📨'),
  ];
  INTROS['bz-data'] = [
    _sc('bunny', 'We got hundreds of survey comments. Nobody has time to read them all!', 'Nous avons reçu des centaines de commentaires de sondage. Personne n’a le temps de tout lire !', 'Recibimos cientos de comentarios de una encuesta. ¡Nadie tiene tiempo de leerlos todos!', 'हमें सर्वे की सैकड़ों टिप्पणियाँ मिली हैं। सबको पढ़ने का समय किसी के पास नहीं!', '💬 📚 😵'),
    _sc('bear', 'AI can group comments into themes, suggest formulas and propose charts. Ask for counts and quotes as evidence.', 'L’IA peut regrouper les commentaires par thèmes, suggérer des formules et proposer des graphiques. Demandez nombres et citations comme preuves.', 'La IA puede agrupar comentarios en temas, sugerir fórmulas y proponer gráficos. Pide conteos y citas como pruebas.', 'AI टिप्पणियों को विषयों में बाँट सकता है, फ़ॉर्मूले सुझा सकता है और चार्ट बता सकता है। सबूत के तौर पर गिनती और उद्धरण माँगें।', '🗂️ 🧮 📊 🔎'),
    _sc('bear', 'Then check the numbers yourself. AI can misread a column or guess a figure.', 'Ensuite, vérifiez les chiffres vous-même. L’IA peut mal lire une colonne ou deviner un chiffre.', 'Luego comprueba tú mismo las cifras. La IA puede leer mal una columna o inventar un número.', 'फिर आँकड़े खुद जाँचें। AI कॉलम गलत पढ़ सकता है या कोई संख्या अंदाज़े से बता सकता है।', '🧮 👀 ⚠️'),
  ];
  INTROS['bz-customers'] = [
    _sc('bunny', 'Customers write to us all day, and we need fresh marketing posts too. Where does AI fit?', 'Les clients nous écrivent toute la journée, et il nous faut aussi de nouvelles publications. Où l’IA s’intègre-t-elle ?', 'Los clientes nos escriben todo el día y además necesitamos publicaciones nuevas. ¿Dónde encaja la IA?', 'ग्राहक दिन भर लिखते हैं, और हमें नई मार्केटिंग पोस्ट भी चाहिए। AI कहाँ काम आएगा?', '📬 📣 ❓'),
    _sc('bear', 'It drafts replies and copy fast. Show it examples of your brand voice and it will match your style.', 'Elle rédige vite des réponses et des textes. Montrez-lui des exemples du ton de votre marque et elle imitera votre style.', 'Redacta respuestas y textos rápido. Muéstrale ejemplos de la voz de tu marca y copiará tu estilo.', 'वह जवाब और विज्ञापन-टेक्स्ट तेज़ी से बनाता है। उसे अपने ब्रांड की आवाज़ के उदाहरण दिखाएँ, वह आपकी शैली अपना लेगा।', '✍️ 🎨 🗣️'),
    _sc('bear', 'Be honest with customers: say when they talk to AI, use only data they agreed to share, and let a person step in.', 'Soyez honnête avec les clients : dites-leur quand ils parlent à une IA, n’utilisez que les données qu’ils ont acceptées et laissez une personne intervenir.', 'Sé honesto con los clientes: avisa cuando hablan con una IA, usa solo los datos que aceptaron compartir y deja que una persona intervenga.', 'ग्राहकों से ईमानदार रहें: बताएँ कि वे AI से बात कर रहे हैं, केवल सहमति वाला डेटा इस्तेमाल करें और इंसान को दखल देने दें।', '🤝 🏷️ 🔒 🙋'),
  ];
  INTROS['bz-process'] = [
    _sc('bunny', 'So many boring, repeated tasks at work! Could AI do them all?', 'Tant de tâches ennuyeuses et répétitives au travail ! L’IA pourrait-elle toutes les faire ?', '¡Hay tantas tareas aburridas y repetidas en el trabajo! ¿Podría la IA hacerlas todas?', 'काम में इतने उबाऊ, दोहराए जाने वाले काम हैं! क्या AI सब कर सकता है?', '🔁 😴 🤖'),
    _sc('bear', 'Not all at once. Pick one repeated, low-risk task, measure it, and run a small pilot.', 'Pas tout d’un coup. Choisissez une tâche répétitive et peu risquée, mesurez-la et lancez un petit pilote.', 'No todas a la vez. Elige una tarea repetitiva y de bajo riesgo, mídela y haz un piloto pequeño.', 'सब एक साथ नहीं। एक दोहराया जाने वाला, कम जोखिम वाला काम चुनें, उसे नापें और छोटा पायलट चलाएँ।', '🎯 ⏱️ 🧪'),
    _sc('bear', 'If time saved beats the total cost, scale up step by step. If not, change it or stop.', 'Si le temps gagné dépasse le coût total, étendez petit à petit. Sinon, modifiez ou arrêtez.', 'Si el tiempo ahorrado supera el costo total, amplía paso a paso. Si no, cámbialo o detenlo.', 'अगर बचा समय कुल खर्च से ज़्यादा हो, तो कदम-दर-कदम बढ़ाएँ। नहीं तो बदलें या रोक दें।', '📈 💰 🪜'),
  ];
  INTROS['bz-governance'] = [
    _sc('bunny', 'Is it okay to paste my company’s documents into any AI tool?', 'Puis-je coller les documents de mon entreprise dans n’importe quel outil d’IA ?', '¿Está bien pegar los documentos de mi empresa en cualquier herramienta de IA?', 'क्या अपनी कंपनी के दस्तावेज़ किसी भी AI टूल में पेस्ट करना ठीक है?', '📄 🤔 ❓'),
    _sc('bear', 'No. Keep confidential and personal data out, use tools your company approves, and read the AI policy.', 'Non. Gardez les données confidentielles et personnelles à l’écart, utilisez les outils approuvés par votre entreprise et lisez la politique sur l’IA.', 'No. Deja fuera los datos confidenciales y personales, usa herramientas aprobadas por tu empresa y lee la política de IA.', 'नहीं। गोपनीय और निजी डेटा बाहर रखें, कंपनी के मंज़ूर टूल इस्तेमाल करें और AI नीति पढ़ें।', '🔒 ✅ 📘'),
    _sc('bear', 'Watch for bias and made-up facts. A named person checks and signs off, and you say when AI helped.', 'Surveillez les biais et les faits inventés. Une personne désignée vérifie et valide, et vous dites quand l’IA a aidé.', 'Vigila los sesgos y los datos inventados. Una persona designada revisa y da el visto bueno, y tú avisas cuando la IA ayudó.', 'पक्षपात और गढ़े हुए तथ्यों पर नज़र रखें। एक तय व्यक्ति जाँचकर मंज़ूरी दे, और आप बताएँ कि AI ने कब मदद की।', '⚖️ 🌀 ✍️ 🏷️'),
  ];

  SUMMARIES['bz-writing'] = [
    ['Tell AI the facts, goal, reader and tone to get a useful first draft.', 'Donnez à l’IA les faits, l’objectif, le lecteur et le ton pour obtenir un bon premier jet.', 'Dile a la IA los hechos, el objetivo, el lector y el tono para obtener un buen primer borrador.', 'उपयोगी पहला मसौदा पाने के लिए AI को तथ्य, लक्ष्य, पाठक और लहजा बताएँ।'],
    ['Ask for meeting summaries with decisions, owners and dates.', 'Demandez des résumés de réunion avec décisions, responsables et dates.', 'Pide resúmenes de reuniones con decisiones, responsables y fechas.', 'मीटिंग का सार फ़ैसलों, ज़िम्मेदार लोगों और तारीखों के साथ माँगें।'],
    ['Always check names, dates and numbers before you send.', 'Vérifiez toujours les noms, les dates et les chiffres avant d’envoyer.', 'Comprueba siempre nombres, fechas y cifras antes de enviar.', 'भेजने से पहले हमेशा नाम, तारीखें और आँकड़े जाँचें।'],
  ];
  SUMMARIES['bz-data'] = [
    ['AI can group comments into themes and suggest formulas and charts.', 'L’IA peut regrouper des commentaires par thèmes et suggérer des formules et des graphiques.', 'La IA puede agrupar comentarios en temas y sugerir fórmulas y gráficos.', 'AI टिप्पणियों को विषयों में बाँट सकता है और फ़ॉर्मूले व चार्ट सुझा सकता है।'],
    ['Ask for counts and quotes so you can see the evidence.', 'Demandez des nombres et des citations pour voir les preuves.', 'Pide conteos y citas para ver las pruebas.', 'गिनती और उद्धरण माँगें ताकि सबूत दिखें।'],
    ['Recalculate surprising totals yourself and test formulas on a few rows.', 'Recalculez vous-même les totaux surprenants et testez les formules sur quelques lignes.', 'Recalcula tú mismo los totales sorprendentes y prueba las fórmulas en unas filas.', 'चौंकाने वाले कुल योग खुद दोबारा जोड़ें और फ़ॉर्मूले कुछ पंक्तियों पर परखें।'],
  ];
  SUMMARIES['bz-customers'] = [
    ['Let AI draft replies and copy, and let a person review before sending.', 'Laissez l’IA rédiger réponses et textes, et une personne relire avant l’envoi.', 'Deja que la IA redacte respuestas y textos, y que una persona revise antes de enviar.', 'AI को जवाब और टेक्स्ट का मसौदा बनाने दें, और भेजने से पहले इंसान को पढ़ने दें।'],
    ['Describe your brand voice and paste real examples.', 'Décrivez le ton de votre marque et collez de vrais exemples.', 'Describe la voz de tu marca y pega ejemplos reales.', 'अपने ब्रांड की आवाज़ बताएँ और असली उदाहरण पेस्ट करें।'],
    ['Be open that customers are talking to AI, and respect their data.', 'Soyez transparent : les clients doivent savoir qu’ils parlent à une IA. Respectez leurs données.', 'Sé transparente: los clientes deben saber que hablan con una IA. Respeta sus datos.', 'खुलकर बताएँ कि ग्राहक AI से बात कर रहे हैं, और उनके डेटा का सम्मान करें।'],
  ];
  SUMMARIES['bz-process'] = [
    ['Start with repeated, low-risk tasks that have clear rules.', 'Commencez par des tâches répétitives et peu risquées, aux règles claires.', 'Empieza con tareas repetitivas y de bajo riesgo, con reglas claras.', 'दोहराए जाने वाले, कम जोखिम और साफ़ नियमों वाले कामों से शुरू करें।'],
    ['Measure first, run a small pilot, then compare the results.', 'Mesurez d’abord, lancez un petit pilote, puis comparez les résultats.', 'Mide primero, haz un piloto pequeño y luego compara los resultados.', 'पहले नापें, छोटा पायलट चलाएँ, फिर नतीजों की तुलना करें।'],
    ['Count every cost, including review time, before you scale up.', 'Comptez tous les coûts, y compris le temps de relecture, avant d’étendre.', 'Cuenta todos los costos, incluido el tiempo de revisión, antes de ampliar.', 'बढ़ाने से पहले समीक्षा के समय समेत हर खर्च गिनें।'],
  ];
  SUMMARIES['bz-governance'] = [
    ['Keep confidential and personal data out of AI tools, and use approved ones.', 'Gardez les données confidentielles et personnelles hors des outils d’IA, et utilisez ceux qui sont approuvés.', 'Mantén los datos confidenciales y personales fuera de las herramientas de IA y usa las aprobadas.', 'गोपनीय और निजी डेटा को AI टूल से दूर रखें, और मंज़ूर टूल ही इस्तेमाल करें।'],
    ['Check for bias and made-up facts; a named person signs off.', 'Cherchez les biais et les faits inventés ; une personne désignée valide.', 'Busca sesgos y datos inventados; una persona designada da el visto bueno.', 'पक्षपात और गढ़े तथ्यों की जाँच करें; एक तय व्यक्ति मंज़ूरी दे।'],
    ['Follow your company’s AI policy and say when AI helped.', 'Suivez la politique de votre entreprise sur l’IA et dites quand l’IA a aidé.', 'Sigue la política de IA de tu empresa y avisa cuando la IA ayudó.', 'अपनी कंपनी की AI नीति मानें और बताएँ कि AI ने कब मदद की।'],
  ];
})();
