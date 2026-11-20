"""
Apache Spark Session Manager
Configures a high-performance SparkSession for Big Data processing and MLlib.
Includes auto-detection for JAVA_HOME and Java 17/21 JVM options.
"""

import os
import sys
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("SparkManager")

def configure_java_environment():
    """Ensure JAVA_HOME is configured properly, prioritizing JDK 21/17."""
    if not os.environ.get("JAVA_HOME"):
        potential_jdk_paths = [
            r"C:\Program Files\Java\jdk-21.0.11",
            r"C:\Program Files\Java\jdk-21",
            r"C:\Program Files\Java\jdk-17",
            r"C:\Program Files\Java\latest",
            r"C:\Program Files\Eclipse Adoptium\jdk-21",
            r"C:\Program Files\Eclipse Adoptium\jdk-17",
        ]
        for jdk_path in potential_jdk_paths:
            if os.path.isdir(jdk_path):
                os.environ["JAVA_HOME"] = jdk_path
                java_bin = os.path.join(jdk_path, "bin")
                os.environ["PATH"] = java_bin + os.pathsep + os.environ.get("PATH", "")
                logger.info(f"Auto-configured JAVA_HOME -> {jdk_path}")
                break

    # Ensure PYSPARK_PYTHON points to the active python executable
    os.environ["PYSPARK_PYTHON"] = sys.executable
    os.environ["PYSPARK_DRIVER_PYTHON"] = sys.executable

def get_spark_session(app_name="BigData-Product-Recommender", master="local[*]", memory="4g"):
    """
    Build and return an optimized SparkSession.
    Configured for Java 17/21 module access and Windows compatibility.
    """
    configure_java_environment()

    try:
        from pyspark.sql import SparkSession
    except ImportError as e:
        logger.error("pyspark is not installed in the active environment!")
        raise e

    # Java 17+ / 21+ JVM module opening flags required by Apache Spark
    java_options = (
        "--add-opens=java.base/java.lang=ALL-UNNAMED "
        "--add-opens=java.base/java.lang.invoke=ALL-UNNAMED "
        "--add-opens=java.base/java.lang.reflect=ALL-UNNAMED "
        "--add-opens=java.base/java.io=ALL-UNNAMED "
        "--add-opens=java.base/java.net=ALL-UNNAMED "
        "--add-opens=java.base/java.nio=ALL-UNNAMED "
        "--add-opens=java.base/java.util=ALL-UNNAMED "
        "--add-opens=java.base/java.util.concurrent=ALL-UNNAMED "
        "--add-opens=java.base/java.util.concurrent.atomic=ALL-UNNAMED "
        "--add-opens=java.base/sun.nio.ch=ALL-UNNAMED "
        "--add-opens=java.base/sun.nio.cs=ALL-UNNAMED "
        "--add-opens=java.base/sun.security.action=ALL-UNNAMED "
        "--add-opens=java.base/sun.util.calendar=ALL-UNNAMED "
        "-Dsun.io.useCanonCaches=false"
    )

    logger.info(f"Initializing SparkSession: '{app_name}' on {master} with {memory} memory...")

    builder = (
        SparkSession.builder
        .appName(app_name)
        .master(master)
        .config("spark.driver.memory", memory)
        .config("spark.executor.memory", memory)
        .config("spark.sql.shuffle.partitions", "8")
        .config("spark.sql.execution.arrow.pyspark.enabled", "true")
        .config("spark.driver.extraJavaOptions", java_options)
        .config("spark.executor.extraJavaOptions", java_options)
    )

    spark = builder.getOrCreate()
    spark.sparkContext.setLogLevel("WARN")
    logger.info(f"✅ Apache Spark {spark.version} successfully initialized!")
    return spark
