
self.addEventListener("push", (event) => {
    let notification = {
        title: "Eurasian House",
        body: "You have a new chat message.",
        url: "/admin/messages",
    };

    if (event.data) {
        try {
            notification = {
                ...notification,
                ...event.data.json(),
            };
        } catch {
            notification.body = event.data.text();
        }
    }

    const targetUrl = notification.url || "/admin/messages";

    event.waitUntil(
        self.registration.showNotification(notification.title, {
            body: notification.body,
            icon: "/favicon.ico",
            badge: "/favicon.ico",
            tag: notification.tag || "eurasian-chat",
            data: { url: targetUrl },
            renotify: true,
        })
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const targetUrl = new URL(
        event.notification.data?.url || "/admin/messages",
        self.location.origin
    ).href;

    event.waitUntil(
        self.clients.matchAll({
            type: "window",
            includeUncontrolled: true,
        }).then(async (clients) => {
            for (const client of clients) {
                if (client.url.startsWith(self.location.origin)) {
                    await client.navigate(targetUrl);
                    return client.focus();
                }
            }

            return self.clients.openWindow(targetUrl);
        })
    );
});
