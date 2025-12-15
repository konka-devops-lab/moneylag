
/actuator/prometheus
/actuator/metrics
/actuator/health


# Dashboard IDs

1. 4701 - JVM / Micrometer

Heap / Non-heap memory
GC activity
Thread count
CPU usage
👉 This tells you JVM health

2. 12900 - Spring Boot Actuator

HTTP request count
Latency (p95, p99)
Error rate
Endpoint performance
👉 This tells you application behavior


Metrics dashboards answer: “Something is slow or broken”
APM answers: “WHY is it slow and WHERE exactly”


“I configured Grafana alerts using PromQL for application availability, HTTP error rate, latency, JVM heap usage, and database connection pool saturation for a Docker-based Spring Boot service.”