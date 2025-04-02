export function extractTextFromFirstP(htmlString) {
    if (typeof window === "undefined") {
      return "No preview text found."; // Prevent execution on the server
    }
  
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
  
    const paragraphs = doc.querySelectorAll("p");
    for (let p of paragraphs) {
      let text = p.textContent.trim();
      if (text) {
        let words = text.split(/\s+/).slice(0, 60);
        return words.join(" ");
      }
    }
  
    return "No preview text found.";
  }
  