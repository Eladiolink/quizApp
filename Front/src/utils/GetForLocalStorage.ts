export default function getId(): number | null {
    const id = localStorage.getItem("id");
    if (id) {
      const parsedId = parseInt(id);
      if (!isNaN(parsedId)) {
        return parsedId;
      } else {
        console.error("ID salvo no localStorage não é um número válido.");
      }
    } else {
      console.error("ID não encontrado no localStorage.");
    }
    return null;
  }
  