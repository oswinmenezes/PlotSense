#include <WiFi.h>
#include <HTTPClient.h>

// WiFi credentials (home WiFi)
const char* ssid = "HOTSPOT_NAME";
const char* password = "HOTSPOT_PASSWORD";

// Supabase REST API
const char* supabaseURL = "SUPABASE_URL";
const char* supabaseKey = "SUPABASE_KEY";

// IR sensor pins
#define IR1 32
#define IR2 33
#define IR3 25
#define IR4 26

int currentState[4];
int previousState[4] = { -1, -1, -1, -1 }; // initial impossible value

// Debounce timing
unsigned long lastCheck = 0;
const long interval = 1000; // 1 second

// Small debounce per sensor
const int debounceDelay = 100; // ms
int stableState[4] = { -1, -1, -1, -1 };
unsigned long lastChangeTime[4] = {0, 0, 0, 0};

void setup() {
  Serial.begin(9600);

  pinMode(IR1, INPUT);
  pinMode(IR2, INPUT);
  pinMode(IR3, INPUT);
  pinMode(IR4, INPUT);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
}

void loop() {
  unsigned long now = millis();
  if (now - lastCheck >= interval) {
    lastCheck = now;

    // Read sensors
    currentState[0] = digitalRead(IR1);
    currentState[1] = digitalRead(IR2);
    currentState[2] = digitalRead(IR3);
    currentState[3] = digitalRead(IR4);

    Serial.println("---- Parking Status ----");

    for (int i = 0; i < 4; i++) {
      // Debounce per sensor
      if (currentState[i] != stableState[i]) {
        if (now - lastChangeTime[i] >= debounceDelay) {
          stableState[i] = currentState[i];
          lastChangeTime[i] = now;

          String dbStatus = (stableState[i] == LOW) ? "o" : "f"; // LOW = occupied
          updateSupabase(i + 1, dbStatus);
        }
      }

      // Print status
      String statusText = (stableState[i] == LOW) ? "OCCUPIED" : "FREE";
      Serial.print("Parking "); Serial.print(i + 1); Serial.print(": ");
      Serial.println(statusText);
    }

    Serial.println("------------------------\n");
  }
}

void updateSupabase(int slotID, String status) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Add filter to update correct row by ID
    String urlWithFilter = String(supabaseURL) + "?id=eq." + String(slotID);
    http.begin(urlWithFilter);
    http.addHeader("apikey", supabaseKey);
    http.addHeader("Authorization", "Bearer " + String(supabaseKey));
    http.addHeader("Content-Type", "application/json");

    String body = "{\"status\":\"" + status + "\"}";

    int httpResponseCode = http.PATCH(body);
    if (httpResponseCode > 0) {
      Serial.print("Slot "); Serial.print(slotID);
      Serial.print(" updated to "); Serial.println(status);
    } else {
      Serial.print("Error updating slot "); Serial.print(slotID);
      Serial.print(" code: "); Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("WiFi not connected!");
  }
}