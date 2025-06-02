import { useRouter } from "next/navigation";
import Card from "@/components/common/Card";
import { useAuth } from "@/providers/AuthProvider";

export default function ArticleGrid({
  articles,
  searchKeyWord,
  filterSettings,
  sortOption,
  onRequireLogin,
}) {
  const router = useRouter();
  const { user } = useAuth();
  console.log("getMe", user);

  const handleCardClick = async (articleId, article) => {
    if (user) {
      router.push(
        user.nickname === article.userPhotoCard.user.nickname
          ? `/marketplace/sellers/${articleId}`
          : `/marketplace/buyers/${articleId}`,
      );

      console.log("아티클 작성자", article.userPhotoCard.user);
    } else {
      onRequireLogin?.(); // 로그인 필요 모달 띄우기
    }
  };
  const filtered = articles
    .filter((article) =>
      searchKeyWord
        ? article.userPhotoCard.photoCard.title
            .toLowerCase()
            .includes(searchKeyWord.toLowerCase())
        : true,
    )
    .filter((article) => {
      if (!filterSettings) return true;
      const matchRank = filterSettings.rank
        ? article.userPhotoCard.photoCard.rank === filterSettings.rank
        : true;
      const matchGenre = filterSettings.genre
        ? article.userPhotoCard.photoCard.genre === filterSettings.genre
        : true;
      const matchSoldout = filterSettings.soldout
        ? article.userPhotoCard.status === filterSettings.soldout
        : true;
      return matchRank && matchGenre && matchSoldout;
    })
    .sort((a, b) => {
      if (sortOption === "낮은 가격순") return a.price - b.price;
      if (sortOption === "높은 가격순") return b.price - a.price;
      if (sortOption === "최신순")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-[5px] sm:gap-[20px] md:gap-[80px] mt-[20px] justify-items-center">
      {filtered.map((article) => (
        <div
          key={article.id}
          onClick={() => handleCardClick(article.id, article)}
          className="cursor-pointer"
        >
          <Card
            type={article.remainingQuantity !== 0 ? "original" : "soldout"}
            card={{
              photoCard: {
                title: article.userPhotoCard.photoCard.title,
                rank: article.userPhotoCard.photoCard.rank,
                genre: article.userPhotoCard.photoCard.genre,
                imgURL: article.userPhotoCard.photoCard.imgUrl,
                creator: {
                  nickname: article.userPhotoCard.photoCard.creator.nickname,
                },
              },
              price: article.price,
              quantity: article.remainingQuantity,
              status: article.userPhotoCard.status,
              totalQuantity: article.totalQuantity,
            }}
          />
        </div>
      ))}
    </div>
  );
}
