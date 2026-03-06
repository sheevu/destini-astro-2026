<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    json_response(405, [
        'success' => false,
        'error' => 'Method not allowed. Use POST.',
    ]);
}

$input = read_request_payload();

$name = trim((string)($input['name'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$phone = substr(trim((string)($input['phone'] ?? '')), 0, 20);
$topic = trim((string)($input['topic'] ?? ''));
$message = trim((string)($input['message'] ?? ''));
$serviceId = $input['service_id'] ?? null;

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    json_response(422, [
        'success' => false,
        'error' => 'name, email, phone and message are required.',
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(422, [
        'success' => false,
        'error' => 'Invalid email format.',
    ]);
}

if ($serviceId === '' || $serviceId === null) {
    $serviceId = null;
} elseif (!is_numeric($serviceId) || (int)$serviceId <= 0) {
    json_response(422, [
        'success' => false,
        'error' => 'service_id must be a positive integer when provided.',
    ]);
} else {
    $serviceId = (int)$serviceId;
}

$finalMessage = $message;
if ($topic !== '') {
    $finalMessage = "[Inquiry Type: {$topic}]\n\n{$message}";
}

$connection = db();
$statement = $connection->prepare(
    'INSERT INTO form_submissions (name, email, phone, service_id, message, created_at) VALUES (?, ?, ?, NULLIF(?, 0), ?, NOW())'
);

if (!$statement) {
    json_response(500, [
        'success' => false,
        'error' => 'Unable to prepare query.',
        'details' => $connection->error,
    ]);
}

$serviceIdValue = $serviceId === null ? 0 : $serviceId;
$statement->bind_param('sssis', $name, $email, $phone, $serviceIdValue, $finalMessage);
$ok = $statement->execute();

if (!$ok) {
    json_response(500, [
        'success' => false,
        'error' => 'Unable to save form submission.',
        'details' => $statement->error,
    ]);
}

json_response(201, [
    'success' => true,
    'submission_id' => $statement->insert_id,
    'message' => 'Submission stored successfully.',
]);
