export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, company, phone, email, message } = req.body ?? {}

  if (!name || !phone) {
    return res.status(400).json({ error: 'name and phone are required' })
  }

  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('Telegram credentials are not set')
    return res.status(500).json({ error: 'Telegram not configured' })
  }

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })

  const text = [
    '<b>Новая заявка — Imperial Parts Group</b>',
    '',
    `<b>Имя:</b> ${name}`,
    company ? `<b>Компания:</b> ${company}` : null,
    `<b>Телефон:</b> ${phone}`,
    email   ? `<b>Email:</b> ${email}`        : null,
    message ? `<b>Сообщение:</b>\n${message}` : null,
    '',
    `${now}`,
  ]
    .filter(Boolean)
    .join('\n')

  const tgRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    }
  )

  if (!tgRes.ok) {
    const err = await tgRes.text()
    console.error('Telegram API error:', err)
    return res.status(500).json({ error: 'Telegram error' })
  }

  return res.status(200).json({ ok: true })
}
