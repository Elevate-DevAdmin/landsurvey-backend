const mongoose = require('mongoose');

const Task = require('./models/task'); // adjust path
const Scheduling = require('./models/scheduling'); // adjust path

const MONGO_URI =
  'mongodb+srv://arunsimon2007_db_user:MpvsNnS2tUxM7WSl@cluster0.iqtw6ge.mongodb.net/land-servey-live?appName=Cluster0'; // change

async function migrate() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ DB Connected');

    const tasks = await Task.find({ is_deleted: false, active: true });

    console.log(`📦 Found ${tasks.length} tasks`);

    const bulkOps = [];

    for (const task of tasks) {
      // Skip if no number_str
      if (!task.number_str) continue;

      // Convert job_id safely
      let jobObjectId = null;

      const schedulingDoc = {
        task_id: task._id,
        job_id: task.job_id,
        select_client_id: task.select_client_id || '',

        project_managers: task.project_manager
          ? [{ manager: task.project_manager }]
          : [],
        task_scope_id: task.task_scope_id || null,
        estimated_hours: task.estimate_hour ? Number(task.estimate_hour) : null,
        group_number: 0, // default (customize if needed)
        sequence_number: 0, // default
        planned_date: task.completed_task_date || null,
        cost_item: task.billing_line_items.labour_item.labour_cost_items
          ? task.billing_line_items.labour_item.labour_cost_items.map(
              (item) => item.costItem,
            )
          : [],
        assigned_members: [],
        comments: [],
        is_deleted: false,
      };

      bulkOps.push({
        insertOne: { document: schedulingDoc },
      });
    }

    if (bulkOps.length > 0) {
      console.log('Bulk wriging...');

      await Scheduling.bulkWrite(bulkOps);
    }

    console.log(`🚀 Migrated ${bulkOps.length} records`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

migrate();
