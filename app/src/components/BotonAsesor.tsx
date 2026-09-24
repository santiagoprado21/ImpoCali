"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChatAsesor } from "@/components/ChatAsesor";

const CLAVE_POPUP = "autofix.popup-asesor-visto";
const AVATAR = "/marca/asesor-virtual.jpg";

/**
 * Botón flotante de asesor + popup de atención al iniciar la página.
 */
export function BotonAsesor() {
  const [globo, setGlobo] = useState(false);
  const [chat, setChat] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(CLAVE_POPUP)) {
        setGlobo(true);
        return;
      }
    } catch {
      // ignore
    }
    const t = window.setTimeout(() => setPopup(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  function cerrarPopup(abrirChat = false) {
    setPopup(false);
    try {
      window.sessionStorage.setItem(CLAVE_POPUP, "1");
    } catch {
      // ignore
    }
    if (abrirChat) {
      setGlobo(false);
      setChat(true);
    } else {
      setGlobo(true);
    }
  }

  return (
    <>
      {popup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-marca-900/55 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-asesor-titulo"
            className="entrar relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-lima-500 bg-white shadow-2xl"
          >
            <div className="border-b-4 border-lima-500 bg-marca-500 px-6 py-5 text-white">
              <div className="flex items-start gap-3 pr-6">
                <Image
                  src={AVATAR}
                  alt="Asesor virtual Impocali"
                  width={64}
                  height={64}
                  className="h-14 w-14 shrink-0 rounded-full border-2 border-lima-400 object-cover object-top"
                  priority
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-lima-400">
                    Autofix · Atención inmediata
                  </p>
                  <h2
                    id="popup-asesor-titulo"
                    className="mt-1 text-xl font-bold leading-tight sm:text-2xl"
                  >
                    ¿Necesitas ayuda para encontrar un repuesto?
                  </h2>
                </div>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm leading-relaxed text-carbon-700">
                Habla con nuestro{" "}
                <strong className="text-marca-700">asesor virtual</strong>. En
                segundos te ayuda a identificar la pieza, ver stock y recibir
                tu cotización.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => cerrarPopup(true)}
                  className="flex-1 bg-lima-500 px-4 py-3 text-sm font-bold text-marca-900 transition hover:bg-lima-400"
                >
                  Hablar con el asesor
                </button>
                <button
                  type="button"
                  onClick={() => cerrarPopup(false)}
                  className="flex-1 border border-marca-100 px-4 py-3 text-sm font-semibold text-carbon-700 transition hover:bg-marca-50"
                >
                  Ahora no
                </button>
              </div>
            </div>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => cerrarPopup(false)}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-lg text-white transition hover:bg-white/25"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {chat && <ChatAsesor onCerrar={() => setChat(false)} />}

      <div className="fixed bottom-5 left-5 z-40">
        <div className="relative">
          {globo && !chat && !popup && (
            <div
              role="dialog"
              aria-label="Asesor virtual"
              className="entrar absolute bottom-[calc(100%+10px)] left-0 w-[min(16rem,calc(100vw-2.5rem))]"
            >
              <div className="relative rounded-2xl rounded-bl-md bg-marca-500 px-4 py-3 text-white shadow-lg">
                <p className="pr-5 text-sm font-medium leading-snug">
                  Comunícate con un asesor virtual
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setGlobo(false);
                    setChat(true);
                  }}
                  className="mt-2.5 inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-marca-700 transition hover:bg-marca-50"
                >
                  Abrir chat
                </button>
                <button
                  type="button"
                  aria-label="Cerrar mensaje"
                  onClick={() => setGlobo(false)}
                  className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full text-white/80 transition hover:bg-white/15"
                >
                  ×
                </button>
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-5 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-marca-500"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              if (chat) {
                setChat(false);
              } else {
                setGlobo(false);
                setChat(true);
              }
            }}
            aria-label={chat ? "Cerrar asesor virtual" : "Abrir asesor virtual"}
            aria-expanded={chat}
            className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-marca-500 shadow-lg transition hover:scale-105"
          >
            <Image
              src={AVATAR}
              alt="Asesor virtual Impocali"
              fill
              sizes="56px"
              className="object-cover object-top"
              priority
            />
            <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-lima-500" />
          </button>
        </div>
      </div>
    </>
  );
}
