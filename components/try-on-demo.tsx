"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Camera, CameraOff, Move, RotateCcw, Sparkles } from "lucide-react";

type Status = "idle" | "loading" | "live" | "error";

export function TryOnDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
    null,
  );

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(62);
  const [dragging, setDragging] = useState(false);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStatus("idle");
  }, []);

  useEffect(() => () => stop(), [stop]);

  const start = async () => {
    setStatus("loading");
    setMessage("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      setMessage("Trình duyệt không hỗ trợ camera. Hãy thử trên Chrome hoặc Safari.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 } },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }

      setStatus("live");
    } catch {
      setStatus("error");
      setMessage(
        "Không truy cập được camera. Kiểm tra quyền truy cập hoặc thử lại trên HTTPS.",
      );
    }
  };

  const reset = () => {
    setOffset({ x: 0, y: 0 });
    setScale(62);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      ox: offset.x,
      oy: offset.y,
    };
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    setOffset({
      x: drag.ox + (event.clientX - drag.x),
      y: drag.oy + (event.clientY - drag.y),
    });
  };

  const onPointerUp = () => {
    dragRef.current = null;
    setDragging(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="relative overflow-hidden bg-keoz-ink">
        <div className="relative aspect-[4/3] w-full">
          <video
            ref={videoRef}
            className="absolute inset-0 size-full scale-x-[-1] object-cover"
            playsInline
            muted
          />

          {status !== "live" ? (
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/editorial/hero-model.jpg"
                alt="Xem trước gọng kính KEOZ"
                className="size-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/25" />
              <div className="absolute inset-0 grid place-items-center p-6 text-center">
                <div>
                  <p className="font-display text-3xl leading-tight text-white sm:text-4xl">
                    Thử kính bằng camera
                  </p>
                  <p className="mx-auto mt-3 max-w-sm text-sm text-white/65">
                    Bật camera để xem gọng kính nằm trên gương mặt bạn. Hình ảnh
                    chỉ được xử lý trên thiết bị, không lưu lại.
                  </p>
                  <button
                    type="button"
                    onClick={start}
                    disabled={status === "loading"}
                    className="mt-6 inline-flex h-12 items-center gap-3 bg-white px-6 text-[11px] uppercase tracking-[0.24em] text-keoz-red transition-colors hover:bg-keoz-cream disabled:opacity-60"
                  >
                    <Camera className="size-4" />
                    {status === "loading" ? "Đang mở camera" : "Bật camera"}
                  </button>
                  {status === "error" ? (
                    <p className="mx-auto mt-4 max-w-sm text-[11px] leading-relaxed text-red-200">
                      {message}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {status === "live" ? (
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="absolute left-1/2 top-1/2 touch-none select-none"
              style={{
                width: `${scale}%`,
                transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                cursor: dragging ? "grabbing" : "grab",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/editorial/hero-eyewear.jpg"
                alt="Gọng kính KEOZ"
                draggable={false}
                className="w-full mix-blend-multiply"
              />
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-white/70">
                Kéo để di chuyển
              </span>
            </div>
          ) : null}
        </div>

        {status === "live" ? (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-keoz-ink px-4 py-3">
            <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/50">
              <Move className="size-3.5" />
              Demo thử kính
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={stop}
                className="inline-flex items-center gap-2 border border-white/25 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/60 hover:text-white"
              >
                <CameraOff className="size-3.5" />
                Tắt camera
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 border border-white/25 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/60 hover:text-white"
              >
                <RotateCcw className="size-3.5" />
                Đặt lại
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col justify-center">
        <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-keoz-muted">
          <Sparkles className="size-3.5 text-keoz-red" />
          KEOZ Lab
        </p>
        <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl">
          Ba bước để thử
        </h2>

        <ol className="mt-6 space-y-5">
          {[
            {
              title: "Bật camera",
              text: "Cho phép trình duyệt truy cập camera trước. Không có dữ liệu nào rời khỏi thiết bị.",
            },
            {
              title: "Đặt kính",
              text: "Kéo gọng kính đến đúng vị trí trên gương mặt và chỉnh kích thước bên dưới.",
            },
            {
              title: "Chọn mẫu khác",
              text: "Xem chi tiết từng mẫu và quay lại bộ sưu tập để thử phom khác.",
            },
          ].map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="font-display text-xl text-keoz-red">
                0{index + 1}
              </span>
              <div>
                <p className="text-sm">{step.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-keoz-muted">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <label className="mt-8 block">
          <span className="text-[9px] uppercase tracking-[0.22em] text-keoz-muted">
            Kích thước kính — {scale}%
          </span>
          <input
            type="range"
            min={30}
            max={90}
            value={scale}
            disabled={status !== "live"}
            onChange={(event) => setScale(Number(event.target.value))}
            className="mt-3 w-full accent-[#930500] disabled:opacity-40"
          />
          {status !== "live" ? (
            <span className="mt-2 block text-[11px] text-keoz-muted">
              Bật camera để điều chỉnh kích thước và vị trí kính.
            </span>
          ) : null}
        </label>

        <Link
          href="/products"
          className="mt-8 inline-flex h-11 w-fit items-center gap-2 border border-keoz-line px-5 text-[10px] uppercase tracking-[0.24em] transition-colors hover:border-keoz-ink/40"
        >
          Chọn mẫu kính khác
        </Link>
      </div>
    </div>
  );
}
