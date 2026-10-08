import { supabase } from "@/integrations/supabase/client";

export type SavedRakhiWish = {
  name: string;
  wish: string;
  templateId: string;
  lang: string;
  year: number;
  stickers: string[];
  titleId: string;
  borderId: string;
  rakhiDesignId: string;
};

export type RakhiEventType = "name_entered" | "whatsapp_share" | "png_download";

const VISITOR_KEY = "rakhi-visitor-id";

export function getRakhiVisitorId(): string {
  const existing = window.sessionStorage.getItem(VISITOR_KEY);
  if (existing) return existing;

  const visitorId = crypto.randomUUID();
  window.sessionStorage.setItem(VISITOR_KEY, visitorId);
  return visitorId;
}

export async function recordRakhiEvent(
  eventType: RakhiEventType,
  templateId: string,
  year: number,
): Promise<void> {
  try {
    await supabase.functions.invoke("rakhi-wishes", {
      body: {
        action: "event",
        event: {
          eventType,
          templateId,
          year,
          visitorId: getRakhiVisitorId(),
        },
      },
    });
  } catch {
    // Tracking is best-effort and never interrupts card creation or sharing.
  }
}

export async function createSavedWishLink(wish: SavedRakhiWish): Promise<string> {
  const { data, error } = await supabase.functions.invoke<{ token?: string }>("rakhi-wishes", {
    body: { action: "save", wish },
  });

  if (error || !data?.token) {
    throw new Error("Could not save this card right now. Please try again.");
  }

  return `${window.location.origin}/wish/${data.token}`;
}

export async function loadSavedWish(token: string): Promise<SavedRakhiWish> {
  const { data, error } = await supabase.functions.invoke<{ wish?: SavedRakhiWish }>("rakhi-wishes", {
    body: { action: "get", token },
  });

  if (error || !data?.wish) {
    throw new Error("This saved card could not be found.");
  }

  return data.wish;
}