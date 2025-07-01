import { CustomData, EventRequest, ServerEvent, UserData } from "facebook-nodejs-business-sdk";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

const accessToken = process.env.META_ACCESS_TOKEN;
const accountId = process.env.META_ACCOUNT_ID;

const hash = (value: string) => {
  if (!value) return '';
  return createHash('sha256').update(value).digest('hex');
}

export async function POST(req: Request): Promise<NextResponse> {
  const currentTime = Math.floor(Date.now() / 1000);
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  const facebookClickID = searchParams.get('facebookClickID') || '';
  const facebookLeadID = searchParams.get('facebookLeadID') || '';
  const eventName = searchParams.get('eventName') || 'Lead';

  const userData = new UserData()
    .setEmails([hash(email)])
    .setPhones([hash(phone)])

  if (facebookLeadID) userData.setLeadId(facebookLeadID);
  if (facebookClickID) userData.setFbc(facebookClickID);

  const customData = new CustomData().setCustomProperties({
    'lead_event_source': 'Bitrix24',
    'event_source': 'crm'
  })

  const serverEvent = new ServerEvent()
    .setUserData(userData)
    .setCustomData(customData)
    .setEventName(eventName)
    .setEventTime(currentTime)
    .setActionSource("system_generated")

  const eventsData = [serverEvent];

  const eventRequest = new EventRequest(accessToken!, accountId!, eventsData);

  const response = await eventRequest.execute();

  return NextResponse.json({
    success: true,
    message: "Event sent successfully",
    data: response,
  });
}
