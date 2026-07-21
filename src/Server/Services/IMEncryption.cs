using System.Security.Cryptography;
using System.Text;

namespace IGrid.Server.Services;

/// <summary>
/// Encrypts/decrypts IM messages using AES-256-CBC with key derived from user password.
/// </summary>
public static class IMEncryption
{
    private const int KeySize = 32; // 256 bits
    private const int IVSize = 16;  // 128 bits
    private const int SaltSize = 16;
    private const int Iterations = 100_000;

    /// <summary>
    /// Derive encryption key from user password + userId salt.
    /// </summary>
    private static byte[] DeriveKey(string password, int userId)
    {
        // Use userId as deterministic salt
        var salt = Encoding.UTF8.GetBytes($"igrid-im-{userId}-salt");
        using var deriveBytes = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
        return deriveBytes.GetBytes(KeySize);
    }

    /// <summary>
    /// Encrypt plaintext with AES-256-CBC using password-derived key.
    /// Returns Base64 string: IV + ciphertext.
    /// </summary>
    public static string Encrypt(string plaintext, string password, int userId)
    {
        var key = DeriveKey(password, userId);
        using var aes = Aes.Create();
        aes.Key = key;
        aes.GenerateIV();

        using var encryptor = aes.CreateEncryptor();
        var plainBytes = Encoding.UTF8.GetBytes(plaintext);
        var cipherBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

        // Prepend IV to ciphertext
        var result = new byte[aes.IV.Length + cipherBytes.Length];
        Buffer.BlockCopy(aes.IV, 0, result, 0, aes.IV.Length);
        Buffer.BlockCopy(cipherBytes, 0, result, aes.IV.Length, cipherBytes.Length);

        return Convert.ToBase64String(result);
    }

    /// <summary>
    /// Decrypt Base64-encoded ciphertext with password-derived key.
    /// </summary>
    public static string Decrypt(string ciphertext, string password, int userId)
    {
        var key = DeriveKey(password, userId);
        var fullCipher = Convert.FromBase64String(ciphertext);

        using var aes = Aes.Create();
        aes.Key = key;

        // Extract IV from first 16 bytes
        var iv = new byte[IVSize];
        Buffer.BlockCopy(fullCipher, 0, iv, 0, IVSize);
        aes.IV = iv;

        var cipher = new byte[fullCipher.Length - IVSize];
        Buffer.BlockCopy(fullCipher, IVSize, cipher, 0, cipher.Length);

        using var decryptor = aes.CreateDecryptor();
        var plainBytes = decryptor.TransformFinalBlock(cipher, 0, cipher.Length);

        return Encoding.UTF8.GetString(plainBytes);
    }
}
