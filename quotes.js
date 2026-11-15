/* Short encouraging lines for the home greeting; every one says this app is about learning AI.
   They alternate Pinky (bunny), Bruno (bear), Pinky, Bruno ... so each quote matches the character
   currently shown in the flip-over greeting. Each entry: [speaker, en, fr, es, hi]. */
const QUOTES = [
  ['bunny', 'Every AI expert was once a beginner.', "Tout expert en IA a d'abord été débutant.", 'Todo experto en IA fue alguna vez principiante.', 'हर AI विशेषज्ञ कभी शुरुआती था।'],
  ['bear', 'Learn a little AI every day and watch yourself grow.', "Apprenez un peu d'IA chaque jour et regardez-vous progresser.", 'Aprende un poco de IA cada día y mira cómo creces.', 'रोज़ थोड़ा AI सीखें और खुद को बढ़ते देखें।'],
  ['bunny', "Curious about AI? You're in the right forest!", "Curieux de l'IA ? Vous êtes dans la bonne forêt !", '¿Curiosidad por la IA? ¡Estás en el bosque correcto!', 'AI के बारे में उत्सुक हैं? आप सही जंगल में हैं!'],
  ['bear', 'AI is a helper. You are the hero.', "L'IA est une aide. Vous êtes le héros.", 'La IA es una ayudante. Tú eres el héroe.', 'AI एक सहायक है। हीरो आप हैं।'],
  ['bunny', 'Wrong answers? Just practice for learning AI.', "Une mauvaise réponse ? Juste de l'entraînement pour apprendre l'IA.", '¿Respuesta incorrecta? Solo práctica para aprender IA.', 'गलत जवाब? बस AI सीखने की प्रैक्टिस है।'],
  ['bear', 'Ask AI clearly, check carefully, learn happily.', "Demandez clairement à l'IA, vérifiez soigneusement, apprenez avec joie.", 'Pregunta a la IA con claridad, verifica con cuidado, aprende con alegría.', 'AI से साफ़ पूछें, ध्यान से जाँचें, खुशी से सीखें।'],
  ['bunny', 'Hop in! Learning AI is more fun together.', "Sautez dedans ! Apprendre l'IA est plus drôle à plusieurs.", '¡Salta! Aprender IA es más divertido juntos.', 'कूद पड़ो! साथ में AI सीखना ज़्यादा मज़ेदार है।'],
  ['bear', 'Good AI prompts are just clear thoughts.', "Un bon prompt d'IA, c'est une pensée claire.", 'Un buen prompt de IA es solo un pensamiento claro.', 'अच्छा AI प्रॉम्प्ट बस साफ़ सोच है।'],
  ['bunny', "Today's tiny AI lesson is tomorrow's superpower.", "La petite leçon d'IA d'aujourd'hui est le super-pouvoir de demain.", 'La pequeña lección de IA de hoy es el superpoder de mañana.', 'आज का छोटा AI पाठ कल की महाशक्ति है।'],
  ['bear', 'Trust, but verify. Even with a friendly AI.', 'Faites confiance, mais vérifiez. Même avec une IA sympa.', 'Confía, pero verifica. Incluso con una IA amable.', 'भरोसा करें, पर जाँचें। दोस्ताना AI पर भी।'],
];

/* quoteAt(i) -> { who, text } in the current language */
function quoteAt(i) {
  const q = QUOTES[((i % QUOTES.length) + QUOTES.length) % QUOTES.length];
  const col = { en: 1, fr: 2, es: 3, hi: 4, zh: 5 }[LANG.current] ?? 1;
  return { who: q[0], text: q[col] || q[1] };
}
