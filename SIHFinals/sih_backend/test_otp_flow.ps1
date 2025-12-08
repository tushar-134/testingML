$mobile = "9988776655"
$baseUrl = "http://localhost:5000/api/auth"

Write-Host "1. Sending OTP to $mobile..." -ForegroundColor Cyan
try {
    $sendResponse = Invoke-RestMethod -Uri "$baseUrl/send-otp" -Method Post -ContentType "application/json" -Body (@{mobile=$mobile} | ConvertTo-Json)
    
    if ($sendResponse.success) {
        Write-Host "   ✅ Success! Message: $($sendResponse.message)" -ForegroundColor Green
        $otp = $sendResponse.otp
        Write-Host "   🔑 Extracted OTP: $otp" -ForegroundColor Yellow
        
        Write-Host "`n2. Verifying OTP..." -ForegroundColor Cyan
        $verifyBody = @{
            mobile = $mobile
            otp = $otp
        } | ConvertTo-Json
        
        $verifyResponse = Invoke-RestMethod -Uri "$baseUrl/verify-otp" -Method Post -ContentType "application/json" -Body $verifyBody
        
        if ($verifyResponse.success) {
            Write-Host "   ✅ Verification Successful! Message: $($verifyResponse.message)" -ForegroundColor Green
        } else {
            Write-Host "   ❌ Verification Failed: $($verifyResponse.message)" -ForegroundColor Red
        }
    } else {
        Write-Host "   ❌ Send Failed: $($sendResponse.message)" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "   Server Response: $($reader.ReadToEnd())" -ForegroundColor Red
    }
}
