void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
  int rawValue = analogRead(A0);
  // convo:( rax * 5v/ 1024)* 100 for celsius
  float celsius = (rawValue * 4.88); // 4.88 is ( 5.0/ 1024.0)* 100
  celsius = celsius / 10.0;

  //output as json for python
  Serial.print("{\"temp\": ");
  Serial.print(celsius);
  Serial.print("}");

  delay(2000);
}
