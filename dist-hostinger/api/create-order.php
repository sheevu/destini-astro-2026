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

$customerName = trim((string)($input['customer_name'] ?? ''));
$totalAmount = $input['total_amount'] ?? null;
$status = trim((string)($input['status'] ?? 'Pending'));

if ($customerName === '' || $totalAmount === null || $totalAmount === '') {
    json_response(422, [
        'success' => false,
        'error' => 'customer_name and total_amount are required.',
    ]);
}

if (!is_numeric($totalAmount)) {
    json_response(422, [
        'success' => false,
        'error' => 'total_amount must be numeric.',
    ]);
}

$allowedStatuses = ['Pending', 'Shipped', 'Completed', 'Cancelled'];
if (!in_array($status, $allowedStatuses, true)) {
    json_response(422, [
        'success' => false,
        'error' => 'Invalid status value.',
        'allowed' => $allowedStatuses,
    ]);
}

$amount = (float)$totalAmount;

$connection = db();
$statement = $connection->prepare(
    'INSERT INTO orders (customer_name, total_amount, status) VALUES (?, ?, ?)'
);

if (!$statement) {
    json_response(500, [
        'success' => false,
        'error' => 'Unable to prepare query.',
        'details' => $connection->error,
    ]);
}

$statement->bind_param('sds', $customerName, $amount, $status);
$ok = $statement->execute();

if (!$ok) {
    json_response(500, [
        'success' => false,
        'error' => 'Unable to create order.',
        'details' => $statement->error,
    ]);
}

json_response(201, [
    'success' => true,
    'order_id' => $statement->insert_id,
    'message' => 'Order created successfully.',
]);
