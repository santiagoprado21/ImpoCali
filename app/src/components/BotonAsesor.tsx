"use client";

import { useState } from "react";
import { ChatAsesor } from "@/components/ChatAsesor";

/**
 * Botón flotante de asesor: diálogo de invitación y chat virtual del flujo
 * de búsqueda de repuesto.
 */
export function BotonAsesor() {
  const [globo, setGlobo] = useState(true);
  const [chat, setChat] = useState(false);

  return (
    <>
      {chat && <ChatAsesor onCerrar={() => setChat(false)} />}

      <div className="fixed bottom-5 left-5 z-40">
        <div className="relative">
          {globo && !chat && (
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
                  className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
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
            className="grid h-14 w-14 place-items-center rounded-full bg-marca-500 text-white shadow-lg transition hover:bg-marca-600"
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
