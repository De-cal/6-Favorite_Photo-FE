export function GenreChange(genre) {
  switch (genre) {
    case "PORTRAIT":
      return "인물";
    case "LANDSCAPE":
      return "풍경";
    case "ANIMAL":
      return "동물";
    case "OBJECT":
      return "사물";
    case "FOOD":
      return "음식";
    case "ETC":
      return "기타";
    default:
      return "";
  }
}
