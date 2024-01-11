# Inertial Forces Controller
- This  plugin automatically converts the direction of inertial forces acting on the piers of a curved bridge.

## Details
### version 1.0.0
- This is useful for bridge structure designers, such as those working on curved bridges and skew bridges, including Road and Rail Bridge Structural Engineers.
- In analysis of curved and skew bridges, where the global coordinate system and pier directions aren't parallel, users must apply seismic inertial forces in the most unfavorable direction for each pier.
- Practically, this means choosing the worst-case inertial force direction for out-of-plane/in-plane directions of each pier. The number of load cases increases with the number of piers.Traditionally, this required cumbersome calculations for each pier in curved bridges.
- A new plugin simplifies this by allowing inputs in directions rotated around the global coordinate system's Z-axis.