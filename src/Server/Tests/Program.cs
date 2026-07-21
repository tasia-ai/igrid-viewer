using System;
using System.Reflection;
using System.Linq;

var asm = typeof(OpenMetaverse.GridClient).Assembly;

// Check ParcelManager for environment-related members
var parcelType = typeof(OpenMetaverse.ParcelManager);
Console.WriteLine("=== ParcelManager events ===");
foreach (var e in parcelType.GetEvents(BindingFlags.Public | BindingFlags.Instance))
    Console.WriteLine($"  {e.EventHandlerType?.Name} {e.Name}");
Console.WriteLine("\n=== ParcelManager methods with 'Env' or 'Wind' ===");
foreach (var m in parcelType.GetMethods(BindingFlags.Public | BindingFlags.Instance)
    .Where(m => m.Name.Contains("Env") || m.Name.Contains("Wind") || m.Name.Contains("Set") || m.Name.Contains("Get")))
    Console.WriteLine($"  {m.ReturnType.Name} {m.Name}({string.Join(", ", m.GetParameters().Select(p => $"{p.ParameterType.Name} {p.Name}"))})");

// Check for Parcel properties with Environment info
Console.WriteLine("\n=== Parcel class ===");
var parcelClass = asm.GetTypes().FirstOrDefault(t => t.Name == "Parcel" || t.Name == "Land");
if (parcelClass != null)
{
    Console.WriteLine($"Found: {parcelClass.FullName}");
    foreach (var p in parcelClass.GetProperties(BindingFlags.Public | BindingFlags.Instance)
        .Where(p => p.Name.Contains("Sun") || p.Name.Contains("Env") || p.Name.Contains("Color") || p.Name.Contains("Water") || p.Name.Contains("Fog")))
        Console.WriteLine($"  {p.PropertyType.Name} {p.Name}");
}

// Check all assemblies for EnvironmentManager
Console.WriteLine("\n=== EnvironmentManager search ===");
foreach (var a in AppDomain.CurrentDomain.GetAssemblies())
{
    var envTypes = a.GetTypes().Where(t => t.Name.Contains("EnvironmentManager"));
    foreach (var t in envTypes) Console.WriteLine($"  {t.FullName} in {a.GetName().Name}");
}

// Check Region properties
Console.WriteLine("\n=== Sim/Region class ===");
var simType = asm.GetTypes().FirstOrDefault(t => t.Name == "Sim");
if (simType != null)
{
    Console.WriteLine($"Found: {simType.FullName}");
    foreach (var p in simType.GetProperties(BindingFlags.Public | BindingFlags.Instance))
        Console.WriteLine($"  {p.PropertyType.Name} {p.Name}");
}
