const allowedOrigins = [
  "https://readyplayer.me",
  "https://demo.readyplayer.me",
  "https://stage.readyplayer.me",
  "https://beta.readyplayer.me",
  "https://creator.readyplayer.me",
  "https://static.readyplayer.me",
];

const iframe = document.getElementById("rpm-frame");
const loader = document.getElementById("creator-loading");
const viewer = document.getElementById("avatar-viewer");
const avatarUrlField = document.getElementById("avatar-url");
const copyButton = document.getElementById("copy-avatar");
const downloadLink = document.getElementById("download-avatar");
const openButton = document.getElementById("open-rpm");
const randomizeButton = document.getElementById("randomize-avatar");

let currentAvatarUrl = "";

function getCreatorUrl() {
  if (!iframe) return "";
  const container = iframe.closest("[data-rpm-api-key]");
  const apiKey = container?.dataset.rpmApiKey?.trim();
  const url = new URL("https://readyplayer.me/avatar");
  url.searchParams.set("frameApi", "1");
  url.searchParams.set("quality", "high");
  if (apiKey) {
    url.searchParams.set("apiKey", apiKey);
  }
  return url.toString();
}

function subscribe(eventName) {
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.postMessage(
    {
      target: "readyplayerme",
      type: "subscribe",
      eventName,
    },
    "*",
  );
}

function updateAvatar(url) {
  currentAvatarUrl = url;
  if (avatarUrlField) {
    avatarUrlField.textContent = url;
  }

  if (viewer) {
    viewer.setAttribute("src", url);
  }

  if (downloadLink) {
    downloadLink.href = url;
    downloadLink.setAttribute("download", "ready-player-me-avatar.glb");
    downloadLink.removeAttribute("aria-disabled");
  }

  if (copyButton) {
    copyButton.disabled = false;
  }
}

function handleReady() {
  if (loader) {
    loader.classList.add("hidden");
    loader.style.removeProperty("display");
    loader.style.removeProperty("opacity");
  }
  ["v1.avatar.exported", "v1.user.set", "v1.avatar.export.failed"].forEach(subscribe);
}

function handleAvatarExport(data) {
  const url = data?.data?.url;
  if (!url) return;
  updateAvatar(url);
}

function handleAvatarExportFailed(data) {
  if (!avatarUrlField) return;
  avatarUrlField.textContent = "Export failed. Try again.";
  if (copyButton) {
    copyButton.setAttribute("disabled", "");
    copyButton.disabled = true;
  }
  if (downloadLink) {
    downloadLink.setAttribute("aria-disabled", "true");
  }
}

function onMessage(event) {
  if (!allowedOrigins.some((origin) => event.origin.startsWith(origin))) {
    return;
  }
  const data = event.data;
  if (!data || data.source !== "readyplayerme") {
    return;
  }

  switch (data.eventName) {
    case "v1.iframe.ready":
    case "v1.frame.ready":
      handleReady();
      break;
    case "v1.avatar.exported":
      handleAvatarExport(data);
      break;
    case "v1.avatar.export.failed":
      handleAvatarExportFailed(data);
      break;
    default:
      break;
  }
}

function focusCreator() {
  iframe?.focus();
  iframe?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function init() {
  if (!iframe) return;
  iframe.src = getCreatorUrl();
  window.addEventListener("message", onMessage);

  openButton?.addEventListener("click", focusCreator);

  copyButton?.addEventListener("click", async () => {
    if (!currentAvatarUrl) return;
    try {
      await navigator.clipboard.writeText(currentAvatarUrl);
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy URL";
      }, 1500);
    } catch (error) {
      console.warn("Clipboard unavailable", error);
      copyButton.textContent = "Press ⌘/Ctrl+C";
      setTimeout(() => {
        copyButton.textContent = "Copy URL";
      }, 2000);
    }
  });

  if (downloadLink) {
    downloadLink.addEventListener("click", (event) => {
      if (!currentAvatarUrl) {
        event.preventDefault();
      }
    });
  }

  randomizeButton?.addEventListener("click", () => {
    focusCreator();
    if (loader) {
      loader.classList.remove("hidden");
    }
    if (avatarUrlField) {
      avatarUrlField.textContent = "Waiting for export...";
    }
    if (copyButton) {
      copyButton.disabled = true;
    }
    if (downloadLink) {
      downloadLink.setAttribute("aria-disabled", "true");
    }
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          target: "readyplayerme",
          type: "request",
          action: "randomize-avatar",
        },
        "*",
      );
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
