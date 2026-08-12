export type EventStatus = "PUBLISHED" | "UNPUBLISHED";

export type Event = {
  id: string;
  category: string;
  title: string;
  image: string;
  location: string;
  date: string;
  time: string;
  description: string;
  speaker: string;
  venue: string;
  attendees: number;
  agenda: string[];
  createdAt: string;
  createdBy: string;
};

export type AdminEvent = Event & { status: EventStatus };

export type Team = {
  id: string;
  name: string;
  role: string;
  image: string;
  status: string;
  displayOrder: number;
  createdAt: string;
  createdBy: string;
};

export type AdminTeam = {
  id: string;
  name: string;
  role: string;
  image: string;
  status: EventStatus;
  displayOrder: number;
};
