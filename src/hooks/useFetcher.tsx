"use client";

import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

type ClientInfo = Record<string, any>;

export const useFetcher = () => {
  const [info, setInfo] = useState<ClientInfo | null>(null);

  useEffect(() => {
    const parser = new UAParser();
    const ua = parser.getResult();

    const getWebGLInfo = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!gl) return null;

        //@ts-ignore
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        return debugInfo
          ? {
              //@ts-ignore
              vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
              //@ts-ignore
              renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
            }
          : null;
      } catch {
        return null;
      }
    };

    const data: ClientInfo = {
      userAgent: navigator.userAgent,
      browser: ua.browser,
      engine: ua.engine,
      os: ua.os,
      device: ua.device,
      cpu: ua.cpu,

      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
      },

      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },

      language: navigator.language,
      languages: navigator.languages,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      hardware: {
        //@ts-ignore
        memoryGB: navigator.deviceMemory,
        cpuCores: navigator.hardwareConcurrency,
        touchSupport: "ontouchstart" in window,
      },

      network: (navigator as any).connection
        ? {
            type: (navigator as any).connection.effectiveType,
            downlink: (navigator as any).connection.downlink,
            rtt: (navigator as any).connection.rtt,
          }
        : null,

      storage: {
        cookiesEnabled: navigator.cookieEnabled,
        localStorage: !!window.localStorage,
        sessionStorage: !!window.sessionStorage,
      },

      webgl: getWebGLInfo(),

      privacy: {
        doNotTrack: navigator.doNotTrack,
      },

      misc: {
        online: navigator.onLine,
        referrer: document.referrer,
        platform: navigator.platform,
        vendor: navigator.vendor,
      },

      timestamp: new Date().toISOString(),
    };

    setInfo(data);
  }, []);

  if (!info) return;

  return JSON.stringify(info);
};
