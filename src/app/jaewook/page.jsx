"use client";

import SurprisePointModal from "@/components/modal/randomPoint/SurprisePointModal";
import {
  createNotification1,
  createNotification2,
  createNotification3,
  createNotification4,
  createNotification5,
} from "@/lib/api/notification.api";

export default function PointPage() {
  return (
    <div className="text-black">
      <SurprisePointModal />
      <div>
        <button onClick={() => createNotification1()} className="bg-amber-100">
          알림 생성 1
        </button>
      </div>
      <div>
        <button onClick={() => createNotification2()} className="bg-amber-200">
          알림 생성 2
        </button>
      </div>
      <div>
        <button onClick={() => createNotification3()} className="bg-amber-300">
          알림 생성 3
        </button>
      </div>
      <div>
        <button onClick={() => createNotification4()} className="bg-amber-400">
          알림 생성 4
        </button>
      </div>
      <div>
        <button onClick={() => createNotification5()} className="bg-amber-500">
          알림 생성 5
        </button>
      </div>
    </div>
  );
}
