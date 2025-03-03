type Device = {
  userAgent: string;
  isDesktop: boolean;
  isIos: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isMobileOrTablet: boolean;
  isDesktopOrTablet: boolean;
  isTablet: boolean;
  isWindows: boolean;
  isMacOS: boolean;
  isApple: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isChrome: boolean;
  isSamsung: boolean;
  isCrawler: boolean;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $device: Device,
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $device: Device
  }
}

export {}
