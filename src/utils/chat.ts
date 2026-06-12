export async function streamChatResponse(
  prompt: string,
  onStreamData: (text: string, type?: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const response = await fetch('https://freshers-training-sse.onrender.com/events/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: prompt }),
    signal,
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (!response.body) throw new Error('No response body');

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let done = false;
  let buffer = '';
  let accumulatedText = '';

  while (!done) {
  const { value, done: readerDone } = await reader.read();
  done = readerDone;

  buffer += decoder.decode(value, { stream: true });

  const matches = buffer.match(/data:\s*({.*?}|\[DONE\])/g);

  if (!matches) continue;

  for (const match of matches) {
    const payload = match.replace(/^data:\s*/, "");

    if (payload === "[DONE]") {
      continue;
    }

    try {
      const parsed = JSON.parse(payload);

      const text = parsed.content ?? "";

      accumulatedText += text;
      onStreamData(text, parsed.type);
    } catch (error) {
      console.error("Failed to parse SSE chunk", error);
    }
  }

  buffer = "";
}
  return accumulatedText;
}