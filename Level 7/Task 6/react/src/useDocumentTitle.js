import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]); // Update the title whenever the title prop changes
}

export default useDocumentTitle;
