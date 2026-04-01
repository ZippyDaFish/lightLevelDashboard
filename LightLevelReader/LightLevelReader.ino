void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensor = analogRead(A0); 
  int scaled = map(sensor, 0, 1023, 0, 100);
  Serial.println(scaled);
  delay(1000);
}