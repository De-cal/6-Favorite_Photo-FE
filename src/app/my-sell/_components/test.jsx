import React from "react";

function test() {
  return (
    <div>
      {/* 가로세로 위치설정 잘못 한 예시 */}
      <button onClick={() => openModal(<MobileFilter />, (col = "bottom"), (row = "center"))}></button>
      {/* 가로세로 위치설정 잘못 한 예시 */}
      <button onClick={() => openModal(<MobileFilter />, (col = "bottom"), (row = "center"))}></button>
    </div>
  );
}

export default test;
