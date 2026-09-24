"use client";

import { useEffect, useState } from "react";
import { ChatAsesor } from "@/components/ChatAsesor";

const CLAVE_POPUP = "autofix.popup-asesor-visto";

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
            className="entrar relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="bg-gradient-to-r from-marca-500 to-lima-600 px-6 py-5 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
                Autofix · Atención inmediata
              </p>
              <h2
                id="popup-asesor-titulo"
                className="mt-1 text-2xl font-bold leading-tight"
              >
                ¿Necesitas ayuda para encontrar un repuesto?
              </h2>
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
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-lg text-white transition hover:bg-white/30"
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
              <div className="relative rounded-2xl rounded-bl-md bg-lima-500 px-4 py-3 text-marca-900 shadow-lg">
                <p className="pr-5 text-sm font-semibold leading-snug">
                  Comunícate con un asesor virtual
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setGlobo(false);
                    setChat(true);
                  }}
                  className="mt-2.5 inline-flex rounded-full bg-marca-700 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-marca-800"
                >
                  Abrir chat
                </button>
                <button
                  type="button"
                  aria-label="Cerrar mensaje"
                  onClick={() => setGlobo(false)}
                  className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full text-marca-900/70 transition hover:bg-black/10"
                >
                  ×
                </button>
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-5 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-lima-500"
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
            className="grid h-14 w-14 place-items-center rounded-full bg-lima-500 text-marca-900 shadow-lg transition hover:bg-lima-400"
          >
            <svg
              viewBox="0 0 48 48"
              className="h-8 w-8"
              fill="none"
              aria-hidden
            >
              <circle cx="24" cy="16" r="7" fill="currentColor" opacity="0.95" />
              <path
                d="M10 40c1.5-8 7-12 14-12s12.5 4 14 12"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M9 22v6c0 2 1.5 3.5 3.5 3.5H14"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M39 22v6c0 2-1.5 3.5-3.5 3.5H34"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22c0-8.3 6.7-15 15-15"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
