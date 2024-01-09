// using Microsoft.AspNetCore.Mvc;

// public class PushNotificationController : Controller
// {
//     private readonly FCMNotificationService _fcmNotificationService;

//     public PushNotificationController(FCMNotificationService fcmNotificationService)
//     {
//         _fcmNotificationService = fcmNotificationService;
//     }

//     public IActionResult SendNotification()
//     {
//         var registrationToken = "your_device_fcm_token";
//         var title = "Your notification title";
//         var body = "Your notification body";

//         _fcmNotificationService.SendNotification(registrationToken, title, body);

//         return Ok("Notification sent successfully");
//     }
// }
